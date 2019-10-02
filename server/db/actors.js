/* eslint-disable no-multi-str */
const joi = require('joi');
const { client } = require('./credentials');
const validation = require('../../config/validation');
const logger = require('../../config/winston');

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
    const result = joi.validate(params, validation.actorSchema);
    logger.info(JSON.stringify(result));
    return client.query('insert into actors(actor, age, networth, alias)\
    values($1, $2, $3, $4) returning *;', [params.aname, params.age, params.networth, params.alias]);
  },

  // Actors PUT
  putActor(params, id) {
    const result1 = joi.validate(params, validation.actorSchema);
    logger.info(JSON.stringify(result1));
    const result2 = joi.validate(id, validation.idSchema);
    logger.info(JSON.stringify(result2));
    let toSet = '';
    const columns = Object.keys(params);
    columns.forEach((column) => {
      toSet += `${column} = ${params[column]},`;
    });
    return client.query(`update actors set ${toSet.slice(0, toSet.length - 1)} where id = ${id} returning *;`);
  },

  // Relations GET
  getActorMovies(aName) {
    return client.query('select movie from movies as m, relations as r where m.id = r.movie_id and \
    r.actor_id = (select id from actors where actor = $1);', [aName]);
  },
};
