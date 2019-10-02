const joi = require('joi');

const actorSchema = joi.object().keys({
  actor: joi.string().required(),
  age: joi.number().integer().min(5).max(100),
  networth: joi.string(),
  alias: joi.string().required(),
});

const idSchema = joi.object().keys({
  id: joi.number().integer().min(1).required(),
});

const movieSchema = joi.object().keys({
  movie: joi.string().required(),
  director: joi.string(),
  rating: joi.number().required(),
  runtime: joi.string(),
  boxoffice: joi.string(),
  year: joi.number().integer().min(2008).max(2019),
});

module.exports = {
  actorSchema,
  idSchema,
  movieSchema,
};
