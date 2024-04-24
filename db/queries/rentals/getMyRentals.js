const getPool = require('../../getDB.js');

const getMyRentals = async (rental_tenant) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
      SELECT
      rentals.rental_id,
      rentals.rental_rent_id,
      rentals.rental_owner,
      rentals.rental_tenant,
      rentings.rent_title,
      rentings.rent_description,
      rentings.rent_location,
      rentings.rent_price,
      rentings.rent_cover,
      rentals.rental_start,
      rentals.rental_end,
      rentals.rental_status
      FROM rentals
      INNER JOIN rentings ON rentals.rental_rent_id = rentings.rent_id
      WHERE rental_tenant=?
      `,
      [rental_tenant]
    );

    return result;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getMyRentals };
