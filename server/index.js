/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
const express = require('express');

const app = express();
const port = 3000;

app.use(require('../routes'));

app.listen(port, () => console.log(`Listening on port ${port}...`));
