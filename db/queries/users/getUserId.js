const getPool = require('../../getDB.js');

const getUserId = async (username) => {
  const pool = await getPool();

  const [[user]] = await pool.query(`SELECT id FROM users WHERE username = ?`, [
    username,
  ]);

  return user;
};

module.exports = getUserId;
