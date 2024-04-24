const getPool = require('../../getDB.js');

const postRateOwner = async (username, id, rating, comments) => {
  const pool = await getPool();

  const [getOwner] = await pool.query(
    `
    SELECT rent_owner FROM rentings WHERE rent_id=?
  `,
    [id]
  );
  const ownerUsername = getOwner[0].rent_owner;

  const [postRating] = await pool.query(
    `
      INSERT INTO tenant_ratings (owner_id, tenant_id, renting_id, rating, comments)
      VALUES (?, ?, ?, ?, ?)
    `,
    [ownerUsername, username, id, rating, comments]
  );

  return postRating;
};

module.exports = { postRateOwner };
