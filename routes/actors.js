/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const express = require('express');
const joi = require('joi');
const db = require('../server/db/actors');
const validation = require('../config/validation');
const checkAuth = require('../config/middleware-checkauth');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Actors GET
router.get('/', (req, res, next) => {
  db.getActors()
    .then((resolve) => res.send(resolve.rows))
    .catch(next());
});
router.get('/:aname', (req, res, next) => {
  db.getActor(req.params.aname)
    .then((resolve) => res.send(resolve.rows))
    .catch(next());
});
router.get('/networth/:aname', (req, res, next) => {
  db.getNetworth(req.params.aname)
    .then((resolve) => res.send(resolve.rows))
    .catch(next());
});
router.get('/age/:aname', (req, res, next) => {
  db.getAge(req.params.aname)
    .then((resolve) => res.send(resolve.rows))
    .catch(next());
});
router.get('/alias/:aname', (req, res, next) => {
  db.getAlias(req.params.aname)
    .then((resolve) => res.send(resolve.rows))
    .catch(next());
});

// Actors DELETE
router.delete('/:aname', checkAuth, (req, res, next) => {
  db.deleteActor(req.params.aname)
    .then((resolve) => res.send(resolve.rows))
    .catch(next());
});

// Actors POST
router.post('/', checkAuth, (req, res, next) => {
  joi.validate(req.body, validation.postActorSchema, (err, value) => {
    if (err) {
      res.status(422).send(err.details[0].message);
    } else {
      db.postActor(req.body)
        .then((resolve) => res.send(resolve.rows))
        .catch(next());
    }
  });
});

// Actor PUT
router.put('/:id', checkAuth, (req, res, next) => {
  db.ifExists(req.params.id)
    .then((actor) => {
      if (actor.rows[0].exists) {
        joi.validate(req.body, validation.putActorSchema, (err, value) => {
          if (err) {
            res.status(422).send(err.details[0].message);
          } else {
            joi.validate(req.params.id, validation.idSchema, (err1, value1) => {
              if (err1) {
                res.status(400).send(err1.details[0].message);
              } else {
                db.putActor(req.body, req.params.id)
                  .then((resolve) => res.send(resolve.rows))
                  .catch(next());
              }
            });
          }
        });
      } else {
        return res.status(422).json({
          message: 'Incorrect ID!!',
        });
      }
    })
    .catch(next());
});

// Relational GET
router.get('/:aname/movies', (req, res, next) => {
  db.getActorMovies(req.params.aname)
    .then((resolve) => res.send(resolve.rows))
    .catch(next());
});

module.exports = router;
