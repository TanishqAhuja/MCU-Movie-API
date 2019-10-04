/* eslint-disable no-console */
const express = require('express');
const logger = require('../config/winston');

const app = express();
const port = 3000;

app.use((req, res, next) => {
  logger.info(`${req.method} ~ ${req.url}`);
  next();
});

app.use(require('../routes'));

app.use((req, res, err) => {
  console.log(err);
});

app.use((err, res) => {
  if (err) {
    res.status(404).send('Not found');
  }
});

app.listen((process.env.PORT || port), () => logger.info('Listening...'));
