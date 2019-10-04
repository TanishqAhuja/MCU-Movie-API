/* eslint-disable no-multi-str */
const { client } = require('./credentials');

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
    values($1, $2, $3, $4) returning *;', [params.actor, params.age, params.networth, params.alias]);
  },

  // Actors PUT
  putActor(params, id) {
    let toSet = '';
    const columns = Object.keys(params);
    columns.forEach((column) => {
      toSet += `${column} = '${params[column]}',`;
    });
    return client.query('update actors set $1 where id = $2 returning *;', [toSet.slice(0, toSet.length - 1), id]);
  },

  // Relations GET
  getActorMovies(aName) {
    return client.query('select movie from movies as m, relations as r where m.id = r.movie_id and \
    r.actor_id = (select id from actors where actor = $1);', [aName]);
  },
};
