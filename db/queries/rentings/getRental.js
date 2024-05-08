const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getRental = async (id) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
      SELECT rent_owner, rent_title, rent_id, rent_type, rent_rooms, rent_description, rent_price, rent_location, rent_address, createdAt
      FROM rentings
      WHERE rent_id= ?
        `,
      [id]
    );

    let images = [];

    const [cover] = await connection.query(
      `
        SELECT rent_cover AS rent_image FROM rentings WHERE rent_id=?
      `,
      [id]
    );

    images.unshift(cover[0]);

    const [rentImg] = await connection.query(
      `
      SELECT rent_image
      FROM rent_images
      WHERE rent_id = ?
      `,
      [id]
    );

    const array = Object.values(rentImg).slice();
    for (let index = 0; index < array.length; index++) {
      images.push(rentImg[index]);
    }

    const [services] = await connection.query(
      `
      SELECT elevator, near_beach, near_mountain, hairdryer, washing_machine, ac, smoke_detector, first_kit_aid, wifi, refrigerator, freezer, toaster, fully_equipped FROM services WHERE renting_id = ?
      `,
      [id]
    );

    const [rentals] = await connection.query(
      `
        SELECT rental_start, rental_end
        FROM rentals
        WHERE rental_rent_id=?
        AND rental_status='Aceptado'
      `,
      [id]
    );

    if (result.length === 0) {
      throw generateError('Este alquiler no existe', 404);
    }

    const finalResult = { result: result[0], images, services, rentals };

    return finalResult;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getRental };
