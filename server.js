import { ApolloServer, gql } from "apollo-server";

// mock DB in memory
let tweets = [
	{ 
		id: "1",
		text: "hello",
		
	},
	{ 
		id: "2",
		text: "hello again",

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
	}
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
	console.log(`running on ${url}`);
});