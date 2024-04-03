const { generateError } = require('../../../helpers/generateError.js');
const getPool = require('../../getDB.js');

const postRateOwner = async (username, id, rating, comments) => {
  let connection = await getPool;
  const [checkTenant] = await connection.query(
    `
      SELECT rental_tenant FROM rentals WHERE rental_id=?
    `,
    [id]
  );

  if (!checkTenant[0].rental_tenant === username) {
    throw generateError(`No has sido inquilino de este alquiler`, 401);
  }

  const [getOwner] = await connection.query(
    `
    SELECT rental_owner FROM rentals WHERE rental_id=?
  `,
    [id]
  );
  const ownerUsername = getOwner[0].rental_owner;

  const [getRentalId] = await connection.query(
    `
    SELECT rental_rent_id FROM rentals WHERE rental_id=?
    `,
    [id]
  );
  const renting_id = getRentalId[0].rental_id;

  const [postRating] = await connection.query(
    `
      INSERT INTO owner_ratings (owner_id, renting_id, rating, comments)
      VALUES (?, ?, ?, ?)
    `,
    [ownerUsername, renting_id, rating, comments]
  );

  return postRating;
};

module.exports = { postRateOwner };
