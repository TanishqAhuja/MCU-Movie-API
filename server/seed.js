/* eslint-disable no-console */
/* eslint-disable no-multi-str */
// const fs = require('fs');
// const c2j = require('csvtojson');
const { Client } = require('pg');

// c2j()
//     .fromFile('./CSV data/mcu_networth.csv')
//     .then((jsonObj) => {
//         const jsonStr = JSON.stringify(jsonObj);
//         fs.writeFileSync('./parsed/mcu_networth.json', jsonStr);
//     });


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mcu_api',
  password: 'docker',
  port: 5432,
});

function dropTables() {
  // DROP any exiting tables
  client.query('DROP TABLE IF EXISTS MCU_Movies CASCADE;');
  client.query('DROP TABLE IF EXISTS MCU_Actors CASCADE;');
  client.query('DROP TABLE IF EXISTS MCU_Movies_Actors;');
}

function createTables() {
  client.query('CREATE TABLE MCU_Movies(Movie_id numeric PRIMARY KEY, Movie varchar,\
    Directed_by varchar, Rating numeric, Run_Time varchar, Box_Office varchar);');
  client.query("COPY MCU_Movies FROM 'mcu-movies.csv' DELIMITERS ',' CSV;");

  client.query('CREATE TABLE MCU_Actors(Actor_id numeric PRIMARY KEY, Actor varchar,\
    Age numeric, Networth varchar, Character_Played varchar);');
  client.query("COPY MCU_Actors FROM 'mcu-actors.csv' DELIMITERS ',' CSV;");

  client.query('CREATE TABLE MCU_Movies_Actors(Movie_id numeric, Actor_id numeric,\
    FOREIGN KEY(Movie_id) REFERENCES MCU_Movies(Movie_id) ON UPDATE CASCADE ON DELETE CASCADE,\
    FOREIGN KEY(Actor_id) REFERENCES MCU_Actors(Actor_id) ON UPDATE CASCADE ON DELETE CASCADE)');
  client.query("COPY MCU_Movies_Actors FROM 'mcu-movies-actors.csv' DELIMITERS ',' CSV;");
}

client.connect()
  .then(() => console.log('Connected Successfully!!'))
  .then(() => {
    dropTables();
  })
  .then(() => {
    createTables();
  })
  .then(() => client.query('select * from MCU_Movies_Actors;'))
  .then((res) => {
    console.table(res.rows);
  })
  .catch((err) => console.log(err));
// .finally(() => client.end());
