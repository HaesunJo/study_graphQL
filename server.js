import { ApolloServer, gql } from "apollo-server";


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
		id: ID
		username: String
	}

	type Tweet {
		id: ID
		text: String
		author: User
	}

	type Query {
		allTweets: [Tweet!]!
		singleTweet(id: ID!): Tweet
	}

	type Mutation {
		postTweet(text: String, userId: ID): Tweet
		deleteTweet(id: ID): Boolean
	}
`;

const server = new ApolloServer({typeDefs})


// 01. without typeDefs, this will show an error that 
// Error: Apollo Server requires either an existing schema, modules or typeDefs
// so it needs to be told what is the shape of the data so it can get a query
server.listen().then(({url}) => {
	console.log(`running on ${url}`);
});