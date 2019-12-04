function newLinkSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node();
}

function newVoteSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node();
}

module.exports = {
    newLink: {
        subscribe: newLinkSubscribe,
        resolve: payload => payload,
    },

    newVote: {
        subscribe: newVoteSubscribe,
        resolve: payload => payload,
    },
};
