/* eslint-disable no-multi-str */
const { client } = require('./credentials');

module.exports = {
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
    values($1, $2, $3, $4, $5, $6) returning *;', [params.movie, params.director, params.rating, params.runtime, params.boxoffice, params.year]);
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

  // check id exists
  ifExists(id) {
    return client.query('select exists(select 1 from movies where id = $1);', [id]);
  },
};
