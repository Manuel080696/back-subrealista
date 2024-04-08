const { generateError } = require('../../../helpers/generateError.js');
const getPool = require('../../getDB.js');

const postRental = async (
  rental_rent_id,
  rental_tenant,
  rental_start,
  rental_end
) => {
  let connection = await getPool();

  if (rental_end > rental_start) {
    throw generateError(
      'No puedes elegir una fecha de salida anterior a la fecha de entrada',
      400
    );
  }

  const [owner] = await connection.query(
    `
    SELECT rent_owner FROM rentings WHERE rent_id=?;
    `,
    [rental_rent_id]
  );

  const rental_owner = owner[0].rent_owner;

  const [result] = await connection.query(
    `
      INSERT INTO rentals (rental_rent_id, rental_owner, rental_tenant,rental_start, rental_end)
      VALUES(?,?,?,?,?)
    `,
    [rental_rent_id, rental_owner, rental_tenant, rental_start, rental_end]
  );
  return result.insertId;
};

module.exports = postRental;
