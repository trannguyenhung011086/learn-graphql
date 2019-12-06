const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const app = express();

app.use(cors());

const schema = require('./schema/index');
const resolvers = require('./resolvers/index');

let users = {
    1: {
        id: '1',
        username: 'Robin Wieruch',
        messageIds: [1],
    },
    2: {
        id: '2',
        username: 'Dave Davids',
        messageIds: [2],
    },
};
let messages = {
    1: {
        id: '1',
        text: 'Hello World',
        userId: '1',
    },
    2: {
        id: '2',
        text: 'By World',
        userId: '2',
    },
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
        users,
        me: users[1],
        messages,
    },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 4000 }, () => {
    console.log('Server is running on http://localhost:4000/graphql');
});
