module.exports = {
    links: (parent, args, context) => {
        return context.prisma.user({ id: parent.id }).links();
    },
};
