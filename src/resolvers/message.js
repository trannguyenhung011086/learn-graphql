const uuidv4 = require('uuid/v4');

module.exports = {
    Query: {
        messages: async (parent, args, { models }) => {
            return await models.Message.findAll();
        },
        message: async (parent, { id }, { models }) => {
            return await models.Message.findByPk(id);
        },
    },

    Mutation: {
        createMessage: async (parent, { text }, { me, models }) => {
            return await models.Message.create({
                text,
                userId: me.id,
            });
        },
        deleteMessage: async (parent, { id }, { models }) => {
            return await models.Message.destroy({ where: { id } });
        },
        // updateMessage: (parent, { id, text }, { messages }) => {
        //     const message = Object.values(messages).find(el => el.id === id);

        //     if (!message) return;

        //     message.text = text;
        //     messages[id] = message;
        //     return message;
        // },
    },

    Message: {
        user: async (message, args, { models }) => {
            return await models.User.findByPk(message.userId);
        },
    },
};
