const getPool = require('../../getDB.js');

const getRentings = async () => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(`
      SELECT r.rent_id,
      r.rent_owner,
      r.rent_title,
      r.rent_type,
      r.rent_rooms,
      r.rent_description,
      r.rent_price,
      r.rent_location,
      r.rent_cover
      FROM rentings r
      WHERE active=true
      ORDER BY r.createdAt DESC`);

    return result;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getRentings };
