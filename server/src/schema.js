const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        launches: [Launch!]!
        launch(id: ID!): Launch
        me: User
    }

    type Launch {
        id: ID!
        site: String
        missiong: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type Rocket {
        id: ID!
        name: String
        type: String
    }

    type Mission {
        name: String
        missionPatch(size: PatchSize): String
    }

    enum PatchSize {
        SMALL
        LARGE
    }

    type User {
        id: ID!
        email: String!
        trips: [Launch]!
    }

    type Mutation {
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
        cancelTrip(launchId: ID!): TripUpdateResponse!
        login(email: String!): Auth!
    }

    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }

    type Auth {
        success: Boolean!
        token: String
    }
`;

module.exports = typeDefs;
