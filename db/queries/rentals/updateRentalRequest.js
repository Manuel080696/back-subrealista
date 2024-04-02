const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const updateRentalRequest = async (rental_owner, rental_status, rental_id) => {
  let connection;

  try {
    connection = await getPool();

    const [checkOwner] = await connection.query(
      `
      SELECT * FROM rentals WHERE rental_owner=? AND rental_id=?
      `,
      [rental_owner, rental_id]
    );

    if (checkOwner.length === 0) {
      throw generateError(
        `No tienes peticiones o este alquiler no es tuyo`,
        403
      );
    }

    const [result] = await connection.query(
      `
        UPDATE rentals SET rental_status=? WHERE rental_owner=? AND rental_id=?
      `,
      [rental_status, rental_owner, rental_id]
    );
    return result;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { updateRentalRequest };
