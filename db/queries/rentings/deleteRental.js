const { generateError } = require('../../../helpers/generateError.js');
const getPool = require('../../getDB.js');

const deleteRental = async (rent_owner, rent_id) => {
  let connection;

  try {
    connection = await getPool();

    const [checkOwner] = await connection.query(
      `
      SELECT users.username FROM rentings INNER JOIN users ON users.username = rentings.rent_owner WHERE rentings.rent_owner = ?
      `,
      [rent_owner]
    );

    if (checkOwner[0].username != rent_owner) {
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
        UPDATE rentings SET active=false WHERE rent_id=?
        `,
      [rent_id]
    );

    return;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { deleteRental };
