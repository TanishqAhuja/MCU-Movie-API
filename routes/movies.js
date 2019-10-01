const express = require('express');
const db = require('../server/db/movies');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

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
router.delete('/:mname', (req, res) => {
  db.deleteMovie(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});

// Movies POST
router.post('/', (req, res) => {
  db.postMovie(req.body)
    .then((resolve) => res.send(resolve.rows));
});

// Movies PUT
router.put('/', (req, res) => {
  db.putMovie(req.body, 2)
    .then((resolve) => res.send(resolve.rows));
});

// Relational GET
router.get('/actors/:mname', (req, res) => {
  db.getMovieActors(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});

module.exports = router;
