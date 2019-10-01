const { Client } = require('pg');
const logger = require('../../config/winston');


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mcu_api',
  password: 'docker',
  port: 5432,
});

client.connect()
  .then(() => logger.info('DataBase connected'))
  .catch((err) => logger.info(err));

module.exports = { client };
