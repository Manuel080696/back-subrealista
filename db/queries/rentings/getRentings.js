const getPool = require('../../getDB.js');

const getRentings = async () => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
      SELECT rent_id,
      rent_owner,
      rent_title,
      rent_type,
      rent_rooms,
      rent_description,
      rent_price,
      rent_location,
      rent_cover
      FROM rentings
      WHERE active=true
      ORDER BY createdAt DESC
      `
    );

    const rentingIds = result.map((renting) => renting.rent_id);
    const [imagesResult] = await connection.query(
      `
      SELECT rent_id, rent_image
      FROM rent_images
      WHERE rent_id IN (${rentingIds.join(',')})
      `
    );

    const rentingsWithImages = result.map((renting) => {
      const images = imagesResult.filter(
        (image) => image.rent_id === renting.rent_id
      );
      return { ...renting, images };
    });

    return rentingsWithImages;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getRentings };
