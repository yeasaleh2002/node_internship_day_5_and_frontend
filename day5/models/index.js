require('dotenv').config();
const { Sequelize } = require('sequelize');

const config = {
  DB_DATABASE: process.env.DB_DATABASE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_ADAPTER: process.env.DB_ADAPTER,
  DB_NAME: process.env.DB_NAME,
  DB_HOSTNAME: process.env.DB_HOSTNAME,
  DB_PORT: process.env.DB_PORT,
};

const sequelize = new Sequelize(config?.DB_DATABASE, config.DB_USERNAME, config.DB_PASSWORD, {
  host: config.DB_HOSTNAME,
  dialect: config.DB_ADAPTER
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Import models and initialize them
const TransactionModel = require('./transaction');
const Transaction = TransactionModel(sequelize);

// Sync models
sequelize.sync()
  .then(() => console.log('Models synchronized...'))
  .catch(err => console.log('Error synchronizing models: ' + err));

module.exports = sequelize;
module.exports.Transaction = Transaction;