const { generateError } = require('../../../helpers/generateError.js');
const getPool = require('../../getDB.js');

const postNewImages = async (id, username, imgUrl) => {
  let connection;

  try {
    connection = await getPool();

    const [checkOwner] = await connection.query(
      `
        SELECT rental_owner FROM rentals WHERE rental_id=?
      `,
      [id]
    );
    const check = checkOwner[0].rental_owner === username;

    if (check == false) {
      throw generateError(`No puedes subir fotos a este alquiler`, 401);
    }

    const [result] = await connection.query(
      `
      INSERT INTO rent_images (rent_id, rent_image)
      VALUES (?, ?)
      `,
      [id, imgUrl]
    );

    return result.data;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { postNewImages };
