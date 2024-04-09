const getPool = require('../../getDB.js');

const tenantEmail = async (rental_rent_id) => {
  let connection = await getPool();

  const [tenant] = await connection.query(
    `
    SELECT rental_tenant FROM rentals WHERE rental_id=?;
    `,
    [rental_rent_id]
  );

  const rental_tenant = tenant[0].rental_tenant;

  const [result] = await connection.query(
    `
      SELECT email FROM users WHERE username=?
    `,
    [rental_tenant]
  );
  return result[0].email;
};

module.exports = tenantEmail;
