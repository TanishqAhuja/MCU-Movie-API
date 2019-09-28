/* eslint-disable no-console */
const express = require('express');
const query = require('./queryFunctions');

const app = express();
const port = 3000;

// Actors GET
app.get('/actors', (req, res) => {
  query.getActors()
    .then((resolve) => res.send(resolve.rows));
});
app.get('/networth', (req, res) => {
  query.getNetworth(req.query.aname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/age', (req, res) => {
  query.getAge(req.query.aname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/alias', (req, res) => {
  query.getAlias(req.query.aname)
    .then((resolve) => res.send(resolve.rows));
});
// Actors DELETE
app.delete('/actor', (req, res) => {
  query.deleteActor(req.query.aname)
    .then((resolve) => res.send(resolve.rows));
});
// Actors POST
app.post('/actor', (req, res) => {
  query.postActor(req.query)
    .then((resolve) => res.send(resolve.rows));
});

// Movies GET
app.get('/movies', (req, res) => {
  query.getMovies()
    .then((resolve) => res.send(resolve.rows));
});
app.get('/movie', (req, res) => {
  query.getMovie(req.query.mname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/rating', (req, res) => {
  query.getRating(req.query.mname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/runtime', (req, res) => {
  query.getRunTime(req.query.mname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/director', (req, res) => {
  query.getDirector(req.query.mname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/bocollection', (req, res) => {
  query.getBOCollection(req.query.mname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/year', (req, res) => {
  query.getYear(req.query.mname)
    .then((resolve) => res.send(resolve.rows));
});
// Movies DELETE
app.delete('/movie', (req, res) => {
  query.deleteMovie(req.query.mname)
    .then((resolve) => res.send(resolve.rows));
});
// Movies POST
app.post('/movie', (req, res) => {
  query.postMovie(req.query)
    .then((resolve) => res.send(resolve.rows));
});

// Relations GET
app.get('/relations', (req, res) => {
  query.getRelations()
    .then((resolve) => res.send(resolve.rows));
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
