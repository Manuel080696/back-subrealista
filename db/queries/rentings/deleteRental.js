const { generateError } = require('../../../helpers/generateError.js');
const getPool = require('../../getDB.js');

const deleteRental = async (rent_owner, rent_id) => {
  let connection;

  try {
    connection = await getPool();

    const [checkOwner] = await connection.query(
      `
      SELECT users.id FROM rentings INNER JOIN users ON users.id = rentings.rent_owner WHERE rentings.rent_owner = ?
      `,
      [rent_owner]
    );

    if (checkOwner[0].id != rent_owner) {
      throw generateError(`¡Este alquiler no es tuyo!`, 403);
    }

    const [rentalExists] = await connection.query(
      `SELECT * FROM rentings WHERE rent_id=?`,
      [rent_id]
    );

    if (rentalExists.length === 0) {
      throw generateError(`¡Este alquiler no existe!`, 403);
    }

    await connection.query(
      `
        DELETE FROM rentings WHERE rent_id=?
        `,
      [rent_id]
    );

    return;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { deleteRental };
