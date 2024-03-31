const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getRental = async (id) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
      SELECT rent_owner, rent_title, rent_type, rent_rooms, rent_description, rent_price, rent_location, createdAt
      FROM rentings
      WHERE rent_id= ?
        `,
      [id]
    );

    if (result.length === 0) {
      throw generateError('Este alquiler no existe', 404);
    }
    return result[0];
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getRental };
