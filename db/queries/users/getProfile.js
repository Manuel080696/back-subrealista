const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getProfile = async (username) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
    SELECT
      u.username,
      u.email,
      u.profilePic,
      u.bio,
      u.address,
      u.createdAt,
      u.modifiedAt,
      u.role,
    ROUND(AVG(
      CASE WHEN owner_ratings.owner IS NOT NULL THEN owner_ratings.rating
       WHEN tenant_ratings.tenant IS NOT NULL THEN tenant_ratings.rating
       ELSE NULL
      END), 1) AS avg_rating
    FROM users u
    LEFT JOIN owner_ratings ON owner_ratings.owner = u.username
    LEFT JOIN tenant_ratings ON tenant_ratings.tenant = u.username
    WHERE username=?;
    `,
    [username]
  );

  if (user[0].username === null) {
    throw generateError(`El usuario ${username} no existe`, 404);
  }

  return user[0];
};

module.exports = getProfile;
