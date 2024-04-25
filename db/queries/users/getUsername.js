const getPool = require('../../getDB.js');

const getUsername = async (username) => {
  const pool = await getPool();

  const [[user]] = await pool.query(
    `SELECT username FROM users WHERE username = ?`,
    [username]
  );

  return user;
};

module.exports = getUsername;
