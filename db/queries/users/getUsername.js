const getPool = require('../../getDB.js');

const getUsername = async (id) => {
  const pool = await getPool();

  const [[user]] = await pool.query(`SELECT username FROM users WHERE id = ?`, [
    id,
  ]);

  return user;
};

module.exports = getUsername;
