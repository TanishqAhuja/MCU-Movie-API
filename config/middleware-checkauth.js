/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, 'ABCD_efgh_XYZ');
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Auth Failed',
    });
  }
};
