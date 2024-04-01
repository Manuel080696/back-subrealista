const getPool = require('../../getDB.js');

const getMyRentingsId = async (rental_id, rental_tenant) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
        SELECT * FROM rentals WHERE rental_owner=? AND rental_id=?
      `,
      [rental_tenant, rental_id]
    );

    return result;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getMyRentingsId };
