const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const selectTenantRatings = async (username) => {
  const pool = await getPool();

  const [ratings] = await pool.query(
    `
    SELECT renting_id, rating, owner, tenant, comments, createdAt FROM tenant_ratings WHERE tenant=?
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

module.exports = selectTenantRatings;
