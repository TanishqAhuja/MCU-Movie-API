const express = require('express');
const db = require('../server/db/actors');

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
router.delete('/:aname', (req, res) => {
  db.deleteActor(req.params.aname)
    .then((resolve) => res.send(resolve.rows));
});

// Actors POST
router.post('/', (req, res) => {
  db.postActor(req.body)
    .then((resolve) => res.send(resolve.rows));
});

// Actor PUT
router.put('/', (req, res) => {
  db.putActor(req.body, 2)
    .then((resolve) => res.send(resolve.rows));
});

// Relational GET
router.get('/movies/:aname', (req, res) => {
  db.getActorMovies(req.params.aname)
    .then((resolve) => res.send(resolve.rows));
});

module.exports = router;
