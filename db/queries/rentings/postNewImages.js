const { generateError } = require('../../../helpers/generateError.js');
const getPool = require('../../getDB.js');

const postNewImages = async (id, imgUrl) => {
  let connection;

  try {
    connection = await getPool();

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
