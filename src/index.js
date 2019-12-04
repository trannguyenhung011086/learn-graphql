const path = require('path');
const { GraphQLServer } = require('graphql-yoga');

let links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL',
    },
];

let idCount = links.length;

const resolvers = {
    Query: {
        info: () => 'API of a Hackernews clone',
        feed: () => links,
        link: (parent, args) => links.find(link => link.id === args.id),
    },

    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            };
            links.push(link);
            return link;
        },
        updateLink: (parent, args) => {
            const index = links.findIndex(link => link.id === args.id);
            links[index] = {
                id: args.id,
                description: args.description,
                url: args.url,
            };
            return links[index];
        },
        deleteLink: (parent, args) => {
            const index = links.findIndex(link => link.id === args.id);
            links.splice(index, 1);
            return links[index];
        },
    },
};

const server = new GraphQLServer({
    typeDefs: path.resolve(__dirname, './schema.graphql'),
    resolvers,
});

server.start(() => console.log('Server is running on port 4000'));
