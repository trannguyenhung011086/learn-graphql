const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
    config.database,
    config.databaseUser,
    config.databasePassword,
    {
        dialect: 'postgres',
    },
);

const models = {
    User: sequelize.import('./user'),
    Message: sequelize.import('./message'),
};
Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

module.exports = { sequelize };

module.exports = models;
