const getPool = require('../../getDB.js');

const ownerEmail = async (rental_rent_id) => {
  let connection = await getPool();

  const [owner] = await connection.query(
    `
    SELECT rent_owner FROM rentings WHERE rent_id=?;
    `,
    [rental_rent_id]
  );

  const rental_owner = owner[0].rent_owner;

  const [result] = await connection.query(
    `
      SELECT email FROM users WHERE username=?
    `,
    [rental_owner]
  );
  return result[0].email;
};

module.exports = ownerEmail;
