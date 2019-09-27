/* eslint-disable no-multi-str */
/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mcu_api',
  password: 'docker',
  port: 5432,
});

client.connect()
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));
module.exports = {

  // Actors GET
  getActors() {
    return client.query('select * from actors;');
  },
  getNetworth(aName) {
    return client.query(`select networth from actors where actor='${aName}'`);
  },
  getAge(aName) {
    return client.query(`select age from actors where actor='${aName}'`);
  },
  getAlias(aName) {
    return client.query(`select alias from actors where actor='${aName}'`);
  },

  // Movies GET
  getMovies() {
    return client.query('select * from movies;');
  },
  getMovie(mName) {
    return client.query(`select * from movies where movie='${mName}'`);
  },
  getRating(mName) {
    return client.query(`select rating from movies where movie='${mName}'`);
  },
  getRunTime(mName) {
    return client.query(`select run_time from movies where movie='${mName}'`);
  },
  getDirector(mName) {
    return client.query(`select director from movies where movie='${mName}'`);
  },
  getBOCollection(mName) {
    return client.query(`select box_office from movies where movie='${mName}'`);
  },
  getYear(mName) {
    return client.query(`select year from movies where movie='${mName}'`);
  },

  // Relations GET
  getRelations() {
    return client.query('select movie,actor from movies as m,actors as a,\
    relations as r where m.id=r.movie_id and a.id=r.actor_id;');
  },
};
