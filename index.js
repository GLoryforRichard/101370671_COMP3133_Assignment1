const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers/resolvers');


mongoose.connect('mongodb+srv://richard:lsz190166134@cluster0.zzvyiyw.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to the database');
});


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});


async function startServer() {
  await server.start();
  
  const app = express();


  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}


startServer();
