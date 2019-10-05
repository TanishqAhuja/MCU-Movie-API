/* eslint-disable consistent-return */
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

app.use('*', (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err) {
    console.log(err);
  }
  res.status(404).json({
    error: 'requested URL not found!!',
  });
});

app.listen((process.env.PORT || port), () => logger.info('Listening...'));
