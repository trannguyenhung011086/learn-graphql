const message = (sequelize, DataTypes) => {
    const Message = sequelize.define('message', {
        text: {
            type: DataTypes.STRING,
        },
    });

    Message.associate = models => {
        Message.belongTo(models.User);
    };
};

module.exports = message;
