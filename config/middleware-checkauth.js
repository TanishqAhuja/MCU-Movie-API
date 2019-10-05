/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const environment = require('../config');

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, environment.secret);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'Auth Failed',
    });
  }
};
