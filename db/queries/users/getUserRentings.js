const getPool = require('../../getDB.js');

const getAllUserProducts = async (rent_owner) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
        SELECT * FROM rentings WHERE rent_owner= ?
        `,
      [rent_owner]
    );

    return result;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getAllUserProducts };
