const getPool = require('../../getDB.js');

const getUserUnrated = async (username) => {
  const pool = await getPool();

  const [unratedAsOwner] = await pool.query(
    `
    SELECT
    rental_rent_id,
    rental_start,
    rental_end
    FROM rentals
    WHERE rental_rent_id NOT IN (
      SELECT renting_id
      FROM owner_ratings
    )
    AND rental_owner = ?
    AND rental_status = 'Aceptado'
    `,
    [username]
  );

  const [unratedAsTenant] = await pool.query(
    `
    SELECT
    rental_rent_id,
    rental_start,
    rental_end
    FROM rentals
    WHERE rental_rent_id NOT IN (
      SELECT renting_id
      FROM tenant_ratings
    )
    AND rental_tenant = ?
    AND rental_status = 'Aceptado'
    `,
    [username]
  );

  const finalReturn = {
    unratedAsOwner: unratedAsOwner,
    unratedAsTenant: unratedAsTenant,
  };

  return finalReturn;
};

module.exports = getUserUnrated;
