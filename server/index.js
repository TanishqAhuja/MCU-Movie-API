const express = require('express');
const logger = require('../config/winston');

const app = express();
const port = 3000;

app.use((req, res, next) => {
  logger.info(`${req.method} ~ ${req.url}`);
  next();
});

app.use(require('../routes'));

app.listen(port, () => logger.info(`Listening on port ${port}...`));
