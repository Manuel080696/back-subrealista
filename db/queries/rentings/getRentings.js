const getPool = require('../../getDB.js');

const getRentings = async () => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(`
        SELECT * FROM rentings ORDER BY createdAt DESC`);

    return result;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getRentings };
