const getPool = require('../../getDB.js');

const updateUser = async (
  email,
  username,
  bio,
  address,
  profilePic,
  oldUsername
) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `
      UPDATE users
      SET email = ?, username = ?, bio = ?, address = ?, profilePic = ?
      WHERE username = ?
    `,
      [email, username, bio, address, profilePic, oldUsername]
    );

    return result.affectedRows;
  } catch (error) {
    console.error('Error al modificar el usuario:', error);
    throw error;
  }
};

module.exports = updateUser;
