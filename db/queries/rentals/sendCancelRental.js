const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const sendCancelRental = async (rental_tenant, rental_id) => {
  let connection;

  try {
    connection = await getPool();

    const [checkOwner] = await connection.query(
      `
      SELECT * FROM rentals WHERE rental_tenant=? AND rental_id=?
      `,
      [rental_tenant, rental_id]
    );

    if (checkOwner.length === 0) {
      throw generateError(
        `No tienes peticiones o este alquiler no es tuyo`,
        403
      );
    }

    const [result] = await connection.query(
      `
        UPDATE rentals SET rental_status='Rechazado' WHERE rental_tenant=? AND rental_id=?
      `,
      [rental_tenant, rental_id]
    );
    return result;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { sendCancelRental };
