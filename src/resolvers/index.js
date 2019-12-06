const uuidv4 = require('uuid/v4');

module.exports = {
    Query: {
        me: (parent, args, { me }) => {
            return me;
        },
        users: (parent, args, { users }) => {
            return Object.values(users);
        },
        user: (parent, { id }, { users }) => {
            return users[id];
        },
        messages: (parent, args, { messages }) => {
            return Object.values(messages);
        },
        message: (parent, { id }, { messages }) => {
            return messages[id];
        },
    },

    Mutation: {
        createMessage: (parent, { text }, { me, messages, users }) => {
            const id = uuidv4();
            const message = {
                id,
                userId: me.id,
                text,
            };

            messages[id] = message;
            users[me.id].messageIds = [...users[me.id].messageIds, id];

            return message;
        },
        deleteMessage: (parent, { id }, { messages }) => {
            const { [id]: message, ...otherMessages } = messages;

            if (!message) return false;

            messages = otherMessages;
            return true;
        },
        updateMessage: (parent, { id, text }, { messages }) => {
            const message = Object.values(messages).find(el => el.id === id);

            if (!message) return;

            message.text = text;
            messages[id] = message;
            return message;
        },
    },

    User: {
        messages: (user, args, { messages }) => {
            return Object.values(messages).filter(
                message => message.userId === user.id,
            );
        },
    },

    Message: {
        user: (message, args, { users }) => {
            return users[message.userId];
        },
    },
};
