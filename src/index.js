const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const app = express();

app.use(cors());

const schema = require('./schema/index');
const resolvers = require('./resolvers/index');
const models = require('./models');
const { sequelize } = require('./models');

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

const eraseDatabaseOnSync = true;
const createUsersWithMessages = require('./seedDb');

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        await createUsersWithMessages(models);
    }
    app.listen({ port: 4000 }, () => {
        console.log('Apollo Server on http://localhost:4000/graphql');
    });
});
