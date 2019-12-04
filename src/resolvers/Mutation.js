const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const { getUserId } = require('../utils');

module.exports = {
    signup: async (parent, args, context, info) => {
        const password = await bcrypt.hash(args.password, 10);
        const user = await context.prisma.createUser({ ...args, password });
        const token = jwt.sign({ userId: user.id }, config.appSecret);
        return { token, user };
    },

    login: async (parent, args, context, info) => {
        const user = await context.prisma.user({ email: args.email });
        if (!user) {
            throw new Error('No user found!');
        }

        const token = jwt.sign({ userId: user.id }, config.appSecret);
        return { token, user };
    },

    post: (parent, args, context, info) => {
        const userId = getUserId(context);
        return context.prisma.createLink({
            url: args.url,
            description: args.description,
            postedBy: { connect: { id: userId } },
        });
    },

    vote: async (parent, args, context, info) => {
        const userId = getUserId(context);
        const linkExists = await context.prisma.$exists.vote({
            user: { id: userId },
            link: { id: args.linkId },
        });
        if (linkExists) {
            throw new Error(`Already voted for link: ${args.linkId}`);
        }
        return context.prisma.createVote({
            user: { connect: { id: userId } },
            link: { connect: { id: args.linkId } },
        });
    },
};
