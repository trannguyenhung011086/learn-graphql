require('dotenv').config();

module.exports = {
    database: process.env.DATABASE,
    databaseUser: process.env.DATABASE_USER,
    databasePassword: process.env.DATABASE_PASSWORD,
};
