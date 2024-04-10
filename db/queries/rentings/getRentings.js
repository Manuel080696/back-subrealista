const getPool = require('../../getDB.js');

const getRentings = async () => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(`
      SELECT rent_id,
      rent_owner,
      rent_title,
      rent_type,
      rent_rooms,
      rent_description,
      rent_price,
      rent_location,
      rent_address,
      rent_cover
      FROM rentings
      WHERE active=true
      ORDER BY createdAt DESC`);

    return result;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getRentings };
