const { Client } = require('pg');
const logger = require('../../config/winston');


const client = new Client({
  // connectionString: process.env.DATABASE_URL,
  ssl: true,
  user: 'cufbpucqlmzodu',
  host: 'ec2-107-20-168-237.compute-1.amazonaws.com',
  database: 'd75rptttn0e2pa',
  password: 'd85005a22111e020c5ac443bbaf621de67a27919c5f1a9acfef554ca001bc7ad',
  port: 5432,
});

client.connect()
  .then(() => logger.info('DataBase connected'))
  .catch((err) => {
    logger.error(err);
    process.exit();
  });

module.exports = { client };
