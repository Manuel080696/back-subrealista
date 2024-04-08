const getPool = require('../../getDB.js');

const updateRent = async (
  rent_title,
  rent_type,
  rent_rooms,
  rent_description,
  rent_price,
  rent_location,
  rent_id,
  rent_cover,
  rent_owner
) => {
  let connection;

  try {
    connection = await getPool();
    const setClauses = [];
    const values = [];
    const [checkOwner] = await connection.query(
      `
      SELECT users.username FROM rentings INNER JOIN users ON users.username = rentings.rent_owner WHERE rentings.rent_owner = ?
      `,
      [rent_owner]
    );

    if (checkOwner[0].username != rent_owner) {
      throw generateError(`¡Este alquiler no es tuyo!`, 403);
    }

    if (rent_title !== undefined && rent_title !== null && rent_title !== '') {
      setClauses.push('rent_title = ?');
      values.push(rent_title);
    }

    if (rent_type !== undefined && rent_type !== null && rent_type !== '') {
      setClauses.push('rent_type = ?');
      values.push(rent_type);
    }

    if (rent_rooms !== undefined && rent_rooms !== null && rent_rooms !== '') {
      setClauses.push('rent_rooms = ?');
      values.push(rent_rooms);
    }

    if (
      rent_description !== undefined &&
      rent_description !== null &&
      rent_description !== ''
    ) {
      setClauses.push('rent_description = ?');
      values.push(rent_description);
    }

    if (rent_price !== undefined && rent_price !== null && rent_price !== '') {
      setClauses.push('rent_price = ?');
      values.push(rent_price);
    }

    if (
      rent_location !== undefined &&
      rent_location !== null &&
      rent_location !== ''
    ) {
      setClauses.push('rent_location = ?');
      values.push(rent_location);
    }

    if (rent_cover !== undefined && rent_cover !== null && rent_cover !== '') {
      setClauses.push('rent_cover = ?');
      values.push(rent_cover);
    }

    const sql = ` UPDATE rentings SET ${setClauses.join(', ')} WHERE rent_id = ? `;

    values.push(rent_id);

    const [{ result }] = await connection.query(sql, values);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { updateRent };
