import { ApolloServer, gql } from "apollo-server";

// 03 fake DB
const tweets = [
	{ 
		id: "1",
		text: "hello",
		
	},
	{ 
		id: "2",
		text: "hello again",

	}
]


// 02. graphQL's schema definition language (SDL)
// this will show this error message :
// return new _GraphQLError.GraphQLError(`Syntax Error: ${description}`, {
// GraphQLError: Syntax Error: Unexpected <EOF>.
// ---
// example: 
// const typeDefs = gql`
// type Book { <- define root
// id: ID
// title: String
// author: String
// }
// type Query { // query will be returned, works like GET method
// books: [Book] -> list
// book(id: ID): Book <- query with an argument
// }
// post, put, delete.. all thoes actions have to be in type Mutation{}
// requirement in gql is add ! mark => singleTweet(id: ID!): Tweet! -> it must have an id and must return a tweet
// without !mark could be nullable value
// `;
const typeDefs = gql`

	type User {
		id: ID!
		username: String!
		firstName: String!
		lastName: String!
	}

	type Tweet {
		id: ID!
		text: String!
		author: User
	}

	type Query {
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
			// console.log(args);
			return tweets.find((singleTweet) => singleTweet.id === id);
		}
		// singleTweet() {
		// 	console.log("resolvers are called");
		// 	return null;
		// },
		// ping() {
		// 	return "pong";
		// }
	}
}

const server = new ApolloServer({typeDefs, resolvers})


// 01. without typeDefs, this will show an error that 
// Error: Apollo Server requires either an existing schema, modules or typeDefs
// so it needs to be told what is the shape of the data so it can get a query
server.listen().then(({url}) => {
	console.log(`running on ${url}`);
});