const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getRental = async (id) => {
  let connection;

  try {
    connection = await getPool();
    let finalResult = [];

    const [result] = await connection.query(
      `
      SELECT rent_owner, rent_title, rent_type, rent_rooms, rent_description, rent_price, rent_location, rent_address, rent_cover, createdAt
      FROM rentings
      WHERE rent_id= ?
        `,
      [id]
    );

    finalResult.push([result[0]]);

    const [images] = await connection.query(
      `
      SELECT rent_image FROM rent_images WHERE rent_id = ?
      `,
      [id]
    );

    finalResult.push([...images]);

    const [services] = await connection.query(
      `
      SELECT elevator, near_beach, near_mountain, hairdryer, washing_machine, ac, smoke_detector, first_kit_aid, wifi, refrigerator, freezer, toaster, fully_equipped FROM services WHERE renting_id = ?
      `,
      [id]
    );

    finalResult.push(services);

    if (result.length === 0) {
      throw generateError('Este alquiler no existe', 404);
    }

    return finalResult;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getRental };
