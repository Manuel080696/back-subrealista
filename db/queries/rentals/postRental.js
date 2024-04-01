const getPool = require('../../getDB.js');

const postRental = async (
  rental_rent_id,
  rental_tenant,
  rental_start,
  rental_end
) => {
  let connection = await getPool();
  const [result] = await connection.query(
    `
      INSERT INTO rentals (rental_rent_id, rental_tenant,rental_start, rental_end)
      VALUES(?,?,?,?)
    `,
    [rental_rent_id, rental_tenant, rental_start, rental_end]
  );
  return result.inserId;
};

module.exports = postRental;
