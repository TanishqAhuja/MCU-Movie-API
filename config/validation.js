const joi = require('joi');

const postActorSchema = joi.object().keys({
  actor: joi.string().required(),
  age: joi.number().integer().min(5).max(100),
  networth: joi.string(),
  alias: joi.string().required(),
});

const putActorSchema = joi.object().keys({
  actor: joi.string(),
  age: joi.number().integer().min(5).max(100),
  networth: joi.string(),
  alias: joi.string(),
});

const idSchema = joi.number().integer().required();

const putMovieSchema = joi.object().keys({
  movie: joi.string(),
  director: joi.string(),
  rating: joi.number(),
  runtime: joi.string(),
  boxoffice: joi.string(),
  year: joi.number().integer().min(2008).max(2019),
});

const postMovieSchema = joi.object().keys({
  movie: joi.string().required(),
  director: joi.string(),
  rating: joi.number().required(),
  runtime: joi.string(),
  boxoffice: joi.string(),
  year: joi.number().integer().min(2008).max(2019),
});

const userSchema = joi.object().keys({
  email: joi.string().email().required(),
  username: joi.string().min(3).max(12).required(),
  password: joi.string().min(8).max(16).required(),
});

module.exports = {
  putActorSchema,
  postActorSchema,
  idSchema,
  putMovieSchema,
  postMovieSchema,
  userSchema,
};
