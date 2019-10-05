const { Client } = require('pg');
const logger = require('../../config/winston');


const client = new Client({
  // connectionString: process.env.DATABASE_URL,
  ssl: true,
  host: 'ec2-54-221-244-70.compute-1.amazonaws.com',
  database: 'dc58ielo93ahkv',
  user: 'nvvpzceoeqvjsw',
  port: 5432,
  password: '5b575f2054ab310fbc6cfeb18bd2e81672d1f7ddfd8f514634ddad1854c3cd07',
});

client.connect()
  .then(() => logger.info('DataBase connected'))
  .catch((err) => {
    logger.error(err);
    process.exit();
  });

module.exports = { client };
