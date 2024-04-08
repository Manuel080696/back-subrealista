const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getRental = async (id) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
      SELECT rent_owner, rent_title, rent_type, rent_rooms, rent_description, rent_price, rent_location, rent_cover, createdAt
      FROM rentings
      WHERE rent_id= ?
        `,
      [id]
    );

    const [images] = await connection.query(
      `
      SELECT rent_image FROM rent_images WHERE rent_id = ?
      `,
      [id]
    );

    if (result.length === 0) {
      throw generateError('Este alquiler no existe', 404);
    }

    const finalResult = [result[0], images];

    return finalResult;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getRental };
