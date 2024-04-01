const getPool = require('../../getDB.js');

const getMyRentals = async (rental_tenant) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
        SELECT * FROM rentals WHERE rental_tenant=?
      `,
      [rental_tenant]
    );

    return result;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getMyRentals };
