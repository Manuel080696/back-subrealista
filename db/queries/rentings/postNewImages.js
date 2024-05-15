const { generateError } = require('../../../helpers/index.js');
const getPool = require('../../getDB.js');

const postNewImages = async (username, id, imgUrl) => {
  let connection;

  try {
    connection = await getPool();

    const [checkOwner] = await connection.query(
      `
      SELECT rent_owner FROM rentings WHERE rent_owner=?
      `,
      [username]
    );

    if (checkOwner.length === 0) {
      throw generateError(
        'No tienes permisos para añadir imágenes a este alojamiento',
        401
      );
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
