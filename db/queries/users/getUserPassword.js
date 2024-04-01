const getPool = require('../../getDB.js');

const getUserPassword = async (username) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `
      SELECT password FROM users WHERE username=?
    `,
      [username]
    );

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = getUserPassword;
