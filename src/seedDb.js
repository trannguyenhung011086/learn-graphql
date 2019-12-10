const createUsersWithMessages = async models => {
    await models.User.create(
        {
            username: 'rwieruch',
            messages: [
                {
                    text: 'Published the road to graphql',
                },
            ],
        },
        {
            include: [models.Message],
        },
    );
    await models.User.create(
        {
            username: 'ddavids',
            messages: [
                {
                    text: 'Happy...',
                },
                {
                    text: 'Published...',
                },
            ],
        },
        {
            include: [models.Message],
        },
    );
};

module.exports = createUsersWithMessages;
