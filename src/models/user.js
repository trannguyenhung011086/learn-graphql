const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
        },
    });

    User.associate = models => {
        User.hasMany(models.Message, { onDelete: 'CASADE' });
    };
};

module.exports = user;
