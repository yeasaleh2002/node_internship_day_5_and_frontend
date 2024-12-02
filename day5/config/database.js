// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306, // Default MySQL port
});

module.exports = sequelize;