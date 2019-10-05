/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const express = require('express');
const joi = require('joi');
const db = require('../server/db/movies');
const validation = require('../config/validation');
const logger = require('../config/winston');
const checkAuth = require('../config/middleware-checkauth');

const router = express.Router();

// Movies GET
router.get('/', (req, res, next) => {
  db.getMovies()
    .then((resolve) => res.send(resolve.rows))
    .catch(next);
});
router.get('/:mname', (req, res, next) => {
  db.getMovie(req.params.mname)
    .then((resolve) => res.send(resolve.rows))
    .catch(next);
});
router.get('/rating/:mname', (req, res, next) => {
  db.getRating(req.params.mname)
    .then((resolve) => res.send(resolve.rows))
    .catch(next);
});
router.get('/runtime/:mname', (req, res, next) => {
  db.getRunTime(req.params.mname)
    .then((resolve) => res.send(resolve.rows))
    .catch(next);
});
router.get('/director/:mname', (req, res, next) => {
  db.getDirector(req.params.mname)
    .then((resolve) => res.send(resolve.rows))
    .catch(next);
});
router.get('/bocollection/:mname', (req, res, next) => {
  db.getBOCollection(req.params.mname)
    .then((resolve) => res.send(resolve.rows))
    .catch(next);
});
router.get('/year/:mname', (req, res, next) => {
  db.getYear(req.params.mname)
    .then((resolve) => res.send(resolve.rows))
    .catch(next);
});

// Movies DELETE
router.delete('/:mname', checkAuth, (req, res, next) => {
  db.deleteMovie(req.params.mname)
    .then((resolve) => res.send(resolve.rows))
    .catch(next);
});

// Movies POST
router.post('/', checkAuth, (req, res, next) => {
  joi.validate(req.body, validation.postMovieSchema, (err, value) => {
    if (err) {
      res.status(422).send(err.details[0].message);
    } else {
      db.postMovie(req.body)
        .then((resolve) => res.send(resolve.rows))
        .catch(next);
    }
  });
});

// Movies PUT
router.put('/:id', checkAuth, (req, res, next) => {
  db.ifExists(req.params.id)
    .then((movie) => {
      if (movie.rows[0].exists) {
        joi.validate(req.body, validation.putMovieSchema, (err, value) => {
          if (err) {
            res.status(422).send(err.details[0].message);
          } else {
            db.putMovie(req.body, req.params.id)
              .then((resolve) => res.send(resolve.rows))
              .catch(next);
          }
        });
      } else {
        return res.status(422).json({
          error: 'Incorrect ID!!',
        });
      }
    })
    .catch(next);
});

// Relational GET
router.get('/:mname/actors', (req, res, next) => {
  db.getMovieActors(req.params.mname)
    .then((resolve) => res.send(resolve.rows))
    .catch(next);
});

module.exports = router;
