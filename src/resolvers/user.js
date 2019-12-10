module.exports = {
    Query: {
        me: async (parent, args, { models, me }) => {
            return await models.User.findByPk(me.id);
        },
        users: async (parent, args, { models }) => {
            return await models.User.findAll();
        },
        user: async (parent, { id }, { models }) => {
            return await models.User.findByPk(id);
        },
    },

    User: {
        messages: async (user, args, { models }) => {
            return await models.Message.findAll({
                where: {
                    userId: user.id,
                },
            });
        },
    },
};
