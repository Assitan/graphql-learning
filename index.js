const {
  GraphQLServer
} = require('graphql-yoga');

// Scalar type : type that stores a single value - String, Boolean, Int, Float, ID

// Demo users data

const users = [{
  id: '1',
  name: 'Robert',
  email: 'robert@example.com',
  age: 22,
},
{
  id: '1',
  name: 'Anna',
  email: 'anna@example.com',
  age: 32,
},
{
  id: '1',
  name: 'Sarah',
  email: 'sarah@example.com',
}];

// Type definitions (schema) - name of the query and the type that should back
const typeDefs = `
  type Query {
    me: User!
    post: Post!
    users(query: String): [User!]!
    add(numbers: [Float!]!): Float!
    hello(name: String, email: String): String!
    grades: [Int!]!
    height: Float
    isNice: Boolean
  }

  type User { 
    id: ID!
    name: String!
    email: String!
    age(num: Int): Int
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
    users(root, { query }) {
      if(!query) {
        return users;
      }

      // Filter users by their name
      return users.filter((user) => {
        return user.name.toLowerCase().includes(query.toLowerCase());
      });
    },
    // root : parents, usefull for relational data. Name : arguments contains the info we need, ctx, info
    hello: (root, { name, email }) => `Hello ${name || 'World'}. Your email : ${email}`,
    add(root, { numbers }) {
      if(numbers.length === 0) {
        return 0;
      }

      // Sum value of an array
      return numbers.reduce((acc, curr) => acc + curr);
    },
    grades: () => [1, 23, 4, 6],
    height: () => 1.74,
    isNice: () => true,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => console.log('Server is running on localhost:4000'));