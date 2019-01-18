const {
  GraphQLServer,
} = require('graphql-yoga');

import fs from 'fs';
import path from 'path';
import resolvers from './src/resolvers';


const typeDefs = fs.readFileSync(path.resolve(__dirname, './src/schema.graphql'), {
  encoding: 'utf8'
});


// Scalar type : type that stores a single value - String, Boolean, Int, Float, ID

const server = new GraphQLServer({
  typeDefs, // Type definitions (schema) - name of the query and the type that should send back
  resolvers, // Resolvers (set of functions)
})

server.start(() => console.log('Server is running on localhost:4000'));

