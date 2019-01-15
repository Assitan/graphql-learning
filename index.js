const {
  GraphQLServer
} = require('graphql-yoga');

// Scalar type : type that stores a single value - String, Boolean, Int, Float, ID

// Type definitions (schema) - name of the query and the type that should back
const typeDefs = `
  type Query {
    me: User!
    post: Post!
    hello(name: String, email: String): String!
    height: Float
    isNice: Boolean
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age(num: Int): Int!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean
  }
`

// Resolvers (set of functions)
const resolvers = {
  Query: {
    me() {
      return {
        id: '122MK22',
        name: 'Assitan',
        email: 'rerer@gmail.com',
        age: '29'
      };
    },
    post() {
      return {
        id: '2E3D',
        title: 'Les oiseaux',
        body: 'Lorem Ipsum',
        // published: false, renvoie null car pas obligatoire
      };
    },
    // root : parents, usefull for relational data. Name : arguments contains the info we need, ctx, info
    hello: (root, { name, email }) => `Hello ${name || 'World'}. Your email : ${email}`,
    height: () => 1.74,
    isNice: () => true,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => console.log('Server is running on localhost:4000'));