import { ApolloServer, gql } from "apollo-server";

// mock DB in memory
let tweets = [
	{ 
		id: "1",
		text: "hello",
		userId: "2"
	},
	{ 
		id: "2",
		text: "hello again",
		userId: "1"
	}
]

let users = [
	{
		id: "1",
		firstName: "Haillie",
		lastName: "Jo"
	},
	{
		id: "2",
		firstName: "Haesun",
		lastName: "Jo"
	},
]

const typeDefs = gql`

	type User {
		id: ID!
		"""
			is the sum of firstName and lastName as a string
		"""
		fullname: String!
		firstName: String!
		lastName: String!
	}

	type Tweet {
		id: ID!
		text: String!
		author: User
	}

	type Query {
		allUsers: [User!]!
		allTweets: [Tweet!]!
		singleTweet(id: ID!): Tweet
		ping: String!
	}

	type Mutation {
		postTweet(text: String!, userId: ID!): Tweet!
		"""
		Deletes a Tweet if found, else returns false
		"""
		deleteTweet(id: ID!): Boolean!
	}
`;

const resolvers = {
	Query: {
		allTweets() {
			return tweets;
		},
		singleTweet(root, {id}){ // if it has argument in gql, put it in the second place. first one is always for root
			return tweets.find((singleTweet) => singleTweet.id === id);
		},
		allUsers() {
			console.log("all users called")
			return users;
		}
	},
	// add or delete tweet
	Mutation: {
		postTweet(__, { text, userId}) { // -> add new
			const newTweet ={
				id: tweets.length + 1,
				text,
				userId
			};
			tweets.push(newTweet);
			return newTweet;
		},
		deleteTweet(__, {id}) { // delete tweet
			const tweet = tweets.find((tweet) => tweet.id === id);
			if (!tweet) return false;
			tweets = tweets.filter((tweet) => tweet.id !== id);
			return true;
		}
	},
	User: {
		fullname({firstName, lastName}) {
			// bring data from users DB that shaped in typeDefs and display
			return `${firstName}, ${lastName}`;
		}
	},
	Tweet: {
		author({userId}) {
			// works like 'JOIN' in sql
			// return users.find((user) => user.id === userId)
			uId = users.find((user) => user.id === userId)
			if(!uId) return null;
			return `user id is ${uId}`
		}
	}
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
	console.log(`running on ${url}`);
});