const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        me: User
        users: [User!]
        user(id: ID!): User
    }

    type User {
        id: ID!
        username: String!
        messages: [Message!]
    }
`;
