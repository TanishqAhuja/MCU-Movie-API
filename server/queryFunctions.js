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
  getActor(aName) {
    return client.query('select * from actors where actor=$1', [aName]);
  },
  getNetworth(aName) {
    return client.query('select networth from actors where actor=$1', [aName]);
  },
  getAge(aName) {
    return client.query('select age from actors where actor=$1', [aName]);
  },
  getAlias(aName) {
    return client.query('select alias from actors where actor=$1', [aName]);
  },
  // Actors DELETE
  deleteActor(aName) {
    return client.query('delete from actors where actor=$1', [aName])
      .then(() => (client.query('select * from actors;')));
  },
  // Actors POST
  postActor(params) {
    return client.query('insert into actors(actor, age, networth, alias)\
    values($1, $2, $3, $4) returning *;', [params.aname, params.age, params.networth, params.alias]);
  },
  // Actors PUT
  putActor(params, id) {
    let toSet = '';
    const columns = Object.keys(params);
    columns.forEach((column) => {
      toSet += `${column} = ${params[column]},`;
    });
    return client.query(`update actors set ${toSet.slice(0, toSet.length - 1)} where id = ${id} returning *;`);
  },

  // Movies GET
  getMovies() {
    return client.query('select * from movies;');
  },
  getMovie(mName) {
    return client.query('select * from movies where movie=$1', [mName]);
  },
  getRating(mName) {
    return client.query('select rating from movies where movie=$1', [mName]);
  },
  getRunTime(mName) {
    return client.query('select run_time from movies where movie=$1', [mName]);
  },
  getDirector(mName) {
    return client.query('select director from movies where movie=$1', [mName]);
  },
  getBOCollection(mName) {
    return client.query('select box_office from movies where movie=$1', [mName]);
  },
  getYear(mName) {
    return client.query('select year from movies where movie=$1', [mName]);
  },
  // Movies DELETE
  deleteMovie(mName) {
    return client.query('delete from movies where movie=$1', [mName])
      .then(() => (client.query('select * from movies;')));
  },
  // Movies POST
  postMovie(params) {
    return client.query('insert into movies(movie, director, rating, run_time, box_office, year)\
    values($1, $2, $3, $4, $5, $6) returning *;', [params.mname, params.director, params.rating, params.runtime, params.boxoffice, params.year]);
  },
  // Movies PUT
  putMovie(params, id) {
    let toSet = '';
    const columns = Object.keys(params);
    columns.forEach((column) => {
      toSet += `${column} = ${params[column]},`;
    });
    return client.query(`update movies set ${toSet.slice(0, toSet.length - 1)} where id = ${id} returning *;`);
  },

  // Relations GET
  getMovieActors(mName) {
    return client.query('select actor from actors as a, relations as r where a.id = r.actor_id and \
    r.movie_id = (select id from movies where movie = $1);', [mName]);
  },
  getActorMovies(aName) {
    return client.query('select movie from movies as m, relations as r where m.id = r.movie_id and \
    r.actor_id = (select id from actors where actor = $1);', [aName]);
  },
  getRelations() {
    return client.query('select movie,actor from movies as m,actors as a,\
    relations as r where m.id=r.movie_id and a.id=r.actor_id;');
  },
};
