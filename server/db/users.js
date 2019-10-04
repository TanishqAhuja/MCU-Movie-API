/* eslint-disable no-multi-str */
const { client } = require('./credentials');

module.exports = {
  // POST User
  postUser(params, password) {
    return client.query('insert into users(email, username, password)\
    values($1, $2, $3) returning *;', [params.email, params.username, password]);
  },

  // check if exists
  ifExists(params) {
    return client.query('select * from users where email = $1 or username = $2;',
      [params.email, params.username]);
  },

  // find USER
  findUser(username) {
    return client.query('select * from users where username = $1 limit 1;', [username]);
  },

  // DELETE user
  deleteUser(username) {
    return client.query('delete from users where username = $1;', [username]);
  },
};
