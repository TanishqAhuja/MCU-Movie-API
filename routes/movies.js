const express = require('express');
const joi = require('joi');
const db = require('../server/db/movies');
const validation = require('../config/validation');
const logger = require('../config/winston');
const checkAuth = require('../config/middleware-checkauth');

const router = express.Router();

// Movies GET
router.get('/', (req, res) => {
  db.getMovies()
    .then((resolve) => res.send(resolve.rows));
});
router.get('/:mname', (req, res) => {
  db.getMovie(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});
router.get('/rating/:mname', (req, res) => {
  db.getRating(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});
router.get('/runtime/:mname', (req, res) => {
  db.getRunTime(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});
router.get('/director/:mname', (req, res) => {
  db.getDirector(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});
router.get('/bocollection/:mname', (req, res) => {
  db.getBOCollection(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});
router.get('/year/:mname', (req, res) => {
  db.getYear(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});

// Movies DELETE
router.delete('/:mname', checkAuth, (req, res) => {
  db.deleteMovie(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});

// Movies POST
router.post('/', checkAuth, (req, res) => {
  const result = joi.validate(req.body, validation.postMovieSchema);
  logger.info(JSON.stringify(result));
  db.postMovie(req.body)
    .then((resolve) => res.send(resolve.rows));
});

// Movies PUT
router.put('/:id', checkAuth, (req, res) => {
  const result1 = joi.validate(req.body, validation.putMovieSchema);
  logger.info(JSON.stringify(result1));
  const result2 = joi.validate(req.params.id, validation.idSchema);
  logger.info(JSON.stringify(result2));
  db.putMovie(req.body, req.params.id)
    .then((resolve) => res.send(resolve.rows));
});

// Relational GET
router.get('/:mname/actors', (req, res) => {
  db.getMovieActors(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});

module.exports = router;
