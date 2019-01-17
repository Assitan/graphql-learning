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
  id: '2',
  name: 'Anna',
  email: 'anna@example.com',
  age: 32,
},
{
  id: '3',
  name: 'Sarah',
  email: 'sarah@example.com',
}];

const posts = [{
    id: '10',
    title: 'GraphQL',
    body: 'This is about GraphQL',
    published: true,
    author: '1',
  },
  {
    id: '11',
    title: 'Data Science',
    body: 'This is about Data Science',
    published: false,
    author: '2',
  },
  {
    id: '12',
    title: 'TypeScript',
    body: 'This is about TypeScript',
    published: false,
    author: '3',
  }
];

// Type definitions (schema) - name of the query and the type that should back
const typeDefs = `
  type Query {
    me: User!
    post: Post!
    posts(query: String): [Post!]!
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
    author: User!
  }
`

// Resolvers (set of functions)
const resolvers = {
  Query: {
    // root : parents, usefull for relational data. Name : arguments contains the info we need, ctx, info
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
    posts(root, { query }) {
      if(!query) {
        return posts;
      }

      // Filter posts by their title or body
      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(query.toLowerCase());
        const isBodyMatch = post.body.toLowerCase().includes(query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
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
  // Relational data
  Post: {
    author(root) {
      return users.find((user) => {
        return user.id === root.author;
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => console.log('Server is running on localhost:4000'));