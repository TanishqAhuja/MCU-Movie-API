/* eslint-disable no-console */
const express = require('express');
const query = require('./queryFunctions');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Actors GET
app.get('/actors', (req, res) => {
  query.getActors()
    .then((resolve) => res.send(resolve.rows));
});
app.get('/actors/:aname', (req, res) => {
  query.getActor(req.params.aname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/actors/networth/:aname', (req, res) => {
  query.getNetworth(req.params.aname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/actors/age/:aname', (req, res) => {
  query.getAge(req.params.aname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/actors/alias/:aname', (req, res) => {
  query.getAlias(req.params.aname)
    .then((resolve) => res.send(resolve.rows));
});
// Actors DELETE
app.delete('/actors/:aname', (req, res) => {
  query.deleteActor(req.params.aname)
    .then((resolve) => res.send(resolve.rows));
});
// Actors POST
app.post('/actors', (req, res) => {
  query.postActor(req.body)
    .then((resolve) => res.send(resolve.rows));
});
// Actor PUT
app.put('/actors', (req, res) => {
  query.putActor(req.body, 2)
    .then((resolve) => res.send(resolve.rows));
});

// Movies GET
app.get('/movies', (req, res) => {
  query.getMovies()
    .then((resolve) => res.send(resolve.rows));
});
app.get('/movies/:mname', (req, res) => {
  query.getMovie(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/movies/rating/:mname', (req, res) => {
  query.getRating(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/movies/runtime/:mname', (req, res) => {
  query.getRunTime(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/movies/director/:mname', (req, res) => {
  query.getDirector(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/movies/bocollection/:mname', (req, res) => {
  query.getBOCollection(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/movies/year/:mname', (req, res) => {
  query.getYear(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});
// Movies DELETE
app.delete('/movies/:mname', (req, res) => {
  query.deleteMovie(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});
// Movies POST
app.post('/movies', (req, res) => {
  query.postMovie(req.body)
    .then((resolve) => res.send(resolve.rows));
});
// Movies PUT
app.put('/movies', (req, res) => {
  query.putMovie(req.body, 2)
    .then((resolve) => res.send(resolve.rows));
});

// Relations GET
app.get('/movies/actors/:mname', (req, res) => {
  query.getMovieActors(req.params.mname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/actors/movies/:aname', (req, res) => {
  query.getActorMovies(req.params.aname)
    .then((resolve) => res.send(resolve.rows));
});
app.get('/relations', (req, res) => {
  query.getRelations()
    .then((resolve) => res.send(resolve.rows));
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
