/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-multi-str */
const fs = require('fs');
const { Client } = require('pg');

const client = new Client({
  // connectionString: process.env.DATABASE_URL,
  ssl: true,
  user: 'cufbpucqlmzodu',
  host: 'ec2-107-20-168-237.compute-1.amazonaws.com',
  database: 'd75rptttn0e2pa',
  password: 'd85005a22111e020c5ac443bbaf621de67a27919c5f1a9acfef554ca001bc7ad',
  port: 5432,
});

function dropTables() {
  // DROP any exiting tables
  return Promise.all([
    client.query('DROP TABLE IF EXISTS Movies CASCADE;'),
    client.query('DROP TABLE IF EXISTS Actors CASCADE;'),
    client.query('DROP TABLE IF EXISTS Relations;'),
    client.query('DROP TABLE IF EXISTS Users;'),
  ]);
}

function createTables() {
  const p1 = client.query('CREATE TABLE Movies(ID serial PRIMARY KEY, Movie varchar,\
    Director varchar, Rating numeric, Run_Time varchar, Box_Office varchar, Year numeric);')
    .then(() => {
      const movies = JSON.parse(fs.readFileSync('./parsed/movies.json'));
      const moviesValues = movies.reduce((acc, elem) => {
        acc.push(client.query('INSERT INTO movies(movie, director, rating, run_time, box_office, year) VALUES\
        ($1, $2, $3, $4, $5, $6);',
        [elem.Movie, elem.Director, elem.Rating, elem.Runtime, elem.BoxOffice, elem.Year]));
        return acc;
      }, []);
      return Promise.all(moviesValues);
    });

  const p2 = client.query('CREATE TABLE Actors(ID serial PRIMARY KEY, Actor varchar,\
    Age numeric, Networth varchar, Alias varchar);')
    .then(() => {
      const actors = JSON.parse(fs.readFileSync('./parsed/actors.json'));
      const actorsValues = actors.reduce((acc, elem) => {
        acc.push(client.query('INSERT INTO actors(actor, age, networth, alias) VALUES ($1, $2, $3, $4);',
          [elem.Actor, elem.Age, elem.Networth, elem.Alias]));
        return acc;
      }, []);
      return Promise.all(actorsValues);
    });

  const p3 = client.query('CREATE TABLE Relations(Movie_id serial, Actor_id serial,\
    FOREIGN KEY(Movie_id) REFERENCES Movies(ID) ON UPDATE CASCADE ON DELETE CASCADE,\
    FOREIGN KEY(Actor_id) REFERENCES Actors(ID) ON UPDATE CASCADE ON DELETE CASCADE);')
    .then(() => {
      const relations = JSON.parse(fs.readFileSync('./parsed/relations.json'));
      const relationsValues = relations.reduce((acc, elem) => {
        acc.push(client.query('INSERT INTO relations(movie_id, actor_id) VALUES ($1, $2);',
          [elem.movie_id, elem.actor_id]));
        return acc;
      }, []);
      return Promise.all(relationsValues);
    });

  const p4 = client.query('CREATE TABLE Users(ID serial PRIMARY KEY, Email varchar,\
    Username varchar,Password varchar);');

  return Promise.all([p1, p2, p3, p4]);
}

client.connect()
  .then(() => console.log('Connected Successfully!!'))
  .then(() => dropTables())
  .then(() => createTables())
  .then(() => console.log('Tables Created!!'))
  .then(() => client.end())
  .catch((err) => (err));
