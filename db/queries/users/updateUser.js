const getPool = require('../../getDB.js');

const updateUser = async (email, username, bio, address, oldUsername) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `
      UPDATE users
      SET email = ?, username = ?, bio = ?, address = ?
      WHERE username = ?
    `,
      [email, username, bio, address, oldUsername]
    );

    return result.affectedRows;
  } catch (error) {
    console.error('Error al modificar el usuario:', error);
    throw error;
  }
};

module.exports = updateUser;
