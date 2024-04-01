const getPool = require('../../getDB.js');

const getMyRentalId = async (rental_id, rental_tenant) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
        SELECT * FROM rentals WHERE rental_tenant=? AND rental_id=?
      `,
      [rental_tenant, rental_id]
    );

    return result;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getMyRentalId };
