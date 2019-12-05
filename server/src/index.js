const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./schema');
const { createStore } = require('./utils');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const server = new ApolloServer({
    typeDefs,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store }),
    }),
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`),
);
