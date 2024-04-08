const getPool = require('../../getDB.js');

const createRenting = async (
  rent_title,
  rent_type,
  rent_rooms,
  rent_description,
  rent_price,
  rent_location,
  rent_cover,
  rent_owner
) => {
  let connection;

  try {
    connection = await getPool();

    const [{ result }] = await connection.query(
      `
      INSERT INTO rentings (rent_title, rent_type, rent_rooms, rent_description, rent_price, rent_location, rent_cover, rent_owner)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        rent_title,
        rent_type,
        rent_rooms,
        rent_description,
        rent_price,
        rent_location,
        rent_cover,
        rent_owner,
      ]
    );

    return result;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { createRenting };
