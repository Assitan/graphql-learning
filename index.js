const {
  GraphQLServer
} = require('graphql-yoga');

// Type definitions (schema) - name of the query and the type that should back
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

// Resolvers (set of functions)
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => console.log('Server is running on localhost:4000'));