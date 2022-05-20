import { ApolloServer, gql } from "apollo-server";
import fetch from 'node-fetch';

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

	type Movie {
		id: Int!
		url: String!
		imdb_code: String!
		title: String!
		title_english: String!
		title_long: String!
		slug: String!
		year: Int!
		rating: Float!
		runtime: Float!
		genres: [String]!
		summary: String
		description_full: String!
		synopsis: String!
		yt_trailer_code: String!
		language: String!
		background_image: String!
		background_image_original: String!
		small_cover_image: String!
		medium_cover_image: String!
		large_cover_image: String!
	}

	type Query {
		allUsers: [User!]!
		allTweets: [Tweet!]!
		allMovies: [Movie!]!
		singleTweet(id: ID!): Tweet
		movie(id: String!): Movie
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
		},
		allMovies() {
			return fetch("https://yts.mx/api/v2/list_movies.json") 
			.then((response) => response.json())
			.then((json) => json.data.movies);
		},
		movie(__, {id}){
			return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`) 
			.then((response) => response.json())
			.then((json) => json.data.movie);
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