const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const selectOwnerRatings = async (username) => {
  const pool = await getPool();

  const [ratings] = await pool.query(
    `
    SELECT renting_id, owner_id, tenant_id, rating, comments, createdAt FROM owner_ratings WHERE owner_id=?
    `,
    [username]
  );

  if (ratings.length === 0) {
    throw generateError(
      `El usuario ${username} no tiene valoraciones como inquilino`,
      404
    );
  }

  return ratings;
};

module.exports = selectOwnerRatings;
