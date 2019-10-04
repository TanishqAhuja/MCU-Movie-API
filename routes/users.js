/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const express = require('express');
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../server/db/users');
const validation = require('../config/validation');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/signup', (req, res) => {
  db.ifExists(req.body)
    .then((users) => {
      if (users.rows.length === 0) {
        joi.validate(req.body, validation.userSchema, (err, value) => {
          if (err) {
            res.status(422).send(err.details[0].message);
          } else {
            bcrypt.hash(req.body.password, 10, (err1, hash) => {
              if (err1) {
                return res.status(500).json({
                  error: err1,
                });
              }
              db.postUser(req.body, hash)
                .then((resolve) => res.send(resolve.rows))
                .catch((error) => res.status(500).send(error));
            });
          }
        });
      } else {
        return res.status(409).json({
          message: 'Credentials already Exist!!',
        });
      }
    });
});

router.post('/login/:username', (req, res) => {
  db.findUser(req.params.username)
    .then((user) => {
      if (user.rows.length === 0) {
        return res.status(401).json({
          message: 'Auth Failed',
        });
      }
      bcrypt.compare(req.body.password, user.rows[0].password, (err, response) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth Failed',
          });
        }
        if (response) {
          const payload = {
            email: user.rows[0].email,
            username: user.rows[0].username,
          };
          const SECRET = 'ABCD_efgh_XYZ';
          const token = jwt.sign(payload, SECRET, { expiresIn: '7d' });
          return res.json({
            message: 'Auth Successful',
            token,
          });
        }
        res.status(401).json({
          message: 'Auth Failed',
        });
      });
    })
    .catch((error) => res.status(500).send(error));
});

router.delete('/:username', (req, res) => {
  db.deleteUser(req.params.username)
    .then((resolve) => res.status(200).json({
      message: 'User Deleted!!',
    }))
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
