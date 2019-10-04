/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const express = require('express');
const joi = require('joi');
const db = require('../server/db/actors');
const validation = require('../config/validation');
const logger = require('../config/winston');
const checkAuth = require('../config/middleware-checkauth');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Actors GET
router.get('/', (req, res) => {
  db.getActors()
    .then((resolve) => res.send(resolve.rows));
});
router.get('/:aname', (req, res) => {
  db.getActor(req.params.aname)
    .then((resolve) => res.send(resolve.rows));
});
router.get('/networth/:aname', (req, res) => {
  db.getNetworth(req.params.aname)
    .then((resolve) => res.send(resolve.rows));
});
router.get('/age/:aname', (req, res) => {
  db.getAge(req.params.aname)
    .then((resolve) => res.send(resolve.rows));
});
router.get('/alias/:aname', (req, res) => {
  db.getAlias(req.params.aname)
    .then((resolve) => res.send(resolve.rows));
});

// Actors DELETE
router.delete('/:aname', checkAuth, (req, res) => {
  db.deleteActor(req.params.aname)
    .then((resolve) => res.send(resolve.rows));
});

// Actors POST
router.post('/', checkAuth, (req, res) => {
  joi.validate(req.body, validation.postActorSchema, (err, value) => {
    if (err) {
      res.status(422).send(err.details[0].message);
    } else {
      db.postActor(req.body)
        .then((resolve) => res.send(resolve.rows));
    }
  });
});

// Actor PUT
router.put('/:id', checkAuth, (req, res) => {
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
                  .catch((error) => console.log(error));
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
    .catch((err) => console.log(err));
});

// Relational GET
router.get('/:aname/movies', (req, res) => {
  db.getActorMovies(req.params.aname)
    .then((resolve) => res.send(resolve.rows));
});

module.exports = router;
