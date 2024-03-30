const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getProfile = async (username) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
    SELECT username, profilePic, bio, createdAt, modifiedAt, role FROM users WHERE username=?;
    `,
    [username]
  );

  if (user[0].username === null) {
    throw generateError(`El usuario ${username} no existe`, 404);
  }

  return user[0];
};

module.exports = getProfile;
