const getPool = require('../../getDB.js');

const updateUser = async (email, username, bio, address, oldUsername) => {
  try {
    const pool = await getPool();

    const [rentings] = await pool.query(
      `
        UPDATE rentings
        SET rent_owner = ?
        WHERE rent_owner = ?
      `,
      [username, oldUsername]
    );

    const [rentals_owner] = await pool.query(
      `
        UPDATE rentals
        SET rental_owner = ?
        WHERE rental_owner = ?
      `,
      [username, oldUsername]
    );

    const [rentals_tenant] = await pool.query(
      `
        UPDATE rentals
        SET rental_tenant = ?
        WHERE rental_tenant = ?
      `,
      [username, oldUsername]
    );

    const [owner_ratings] = await pool.query(
      `
        UPDATE owner_ratings
        SET owner = ?
        WHERE owner = ?
      `,
      [username, oldUsername]
    );

    const [tenant_ratings] = await pool.query(
      `
        UPDATE tenant_ratings
        SET tenant = ?
        WHERE tenant = ?
      `,
      [username, oldUsername]
    );

    const [result] = await pool.query(
      `
      UPDATE users
      SET email = ?, username = ?, bio = ?, address = ?
      WHERE username = ?
    `,
      [email, username, bio, address, oldUsername]
    );

    return result.affectedRows;
  } catch (error) {
    console.error('Error al modificar el usuario:', error);
    throw error;
  }
};

module.exports = updateUser;
