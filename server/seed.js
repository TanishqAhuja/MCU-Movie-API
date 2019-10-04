/* eslint-disable no-console */
/* eslint-disable no-multi-str */

const { Client } = require('pg');

const client = new Client({
  // connectionString: process.env.DATABASE_URL,
  ssl: true,
  user: 'cufbpucqlmzodu',
  host: 'ec2-107-20-168-237.compute-1.amazonaws.com',
  database: 'd75rptttn0e2pa',
  password: 'd85005a22111e020c5ac443bbaf621de67a27919c5f1a9acfef554ca001bc7ad',
  port: 5432,
  // URI: 'postgres://cufbpucqlmzodu:d85005a22111e020c5ac443bbaf621de67a27919c5f1a9acfef554ca001bc7ad@ec2-107-20-168-237.compute-1.amazonaws.com:5432/d75rptttn0e2pa',
});

function dropTables() {
  // DROP any exiting tables
  client.query('DROP TABLE IF EXISTS Movies CASCADE;');
  client.query('DROP TABLE IF EXISTS Actors CASCADE;');
  client.query('DROP TABLE IF EXISTS Relations;');
  client.query('DROP TABLE IF EXISTS Users;');
}

function createTables() {
  client.query('CREATE TABLE Movies(ID serial PRIMARY KEY, Movie varchar,\
    Director varchar, Rating numeric, Run_Time varchar, Box_Office varchar, Year numeric);');
  client.query("COPY Movies(Movie, Director, Rating, Run_Time, Box_Office, Year) FROM 'mcu-movies.csv' DELIMITERS ',' CSV;");

  client.query('CREATE TABLE Actors(ID serial PRIMARY KEY, Actor varchar,\
    Age numeric, Networth varchar, Alias varchar);');
  client.query("COPY Actors(Actor, Age, Networth, Alias) FROM 'mcu-actors.csv' DELIMITERS ',' CSV;");

  client.query('CREATE TABLE Relations(Movie_id serial, Actor_id serial,\
    FOREIGN KEY(Movie_id) REFERENCES Movies(ID) ON UPDATE CASCADE ON DELETE CASCADE,\
    FOREIGN KEY(Actor_id) REFERENCES Actors(ID) ON UPDATE CASCADE ON DELETE CASCADE)');
  client.query("COPY Relations FROM 'mcu-movies-actors.csv' DELIMITERS ',' CSV;");

  client.query('CREATE TABLE Users(ID serial PRIMARY KEY, Email varchar,\
    Username varchar,Password varchar);');
}

client.connect()
  .then(() => console.log('Connected Successfully!!'))
  .then(() => {
    dropTables();
  })
  .then(() => {
    createTables();
  })
  .then(() => client.query('select * from Relations;'))
  .then((res) => {
    console.table(res.rows);
  })
  .catch((err) => console.log(err))
  .finally(() => client.end());
