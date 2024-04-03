const { generateError } = require('../../../helpers/generateError.js');
const getPool = require('../../getDB.js');

const postRateTenant = async (username, id, rating, comments) => {
  let connection = await getPool;
  const [checkOwner] = await connection.query(
    `
      SELECT rental_owner FROM rentals WHERE rental_id=?
    `,
    [id]
  );

  if (!checkOwner[0].rental_owner === username) {
    throw generateError(`No has sido inquilino de este alquiler`, 401);
  }

  const [getTenant] = await connection.query(
    `
    SELECT rental_tenant FROM rentals WHERE rental_id=?
  `,
    [id]
  );
  const tenantUsername = getTenant[0].rental_tenant;

  const [getRentalId] = await connection.query(
    `
    SELECT rental_rent_id FROM rentals WHERE rental_id=?
    `,
    [id]
  );
  const renting_id = getRentalId[0].rental_id;

  const [postRating] = await connection.query(
    `
      INSERT INTO tenant_ratings (tenant_id, renting_id, rating, comments)
      VALUES (?, ?, ?, ?)
    `,
    [tenantUsername, renting_id, rating, comments]
  );

  return postRating;
};

module.exports = { postRateTenant };
