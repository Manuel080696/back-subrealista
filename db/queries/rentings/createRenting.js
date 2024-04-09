const getPool = require('../../getDB.js');

const createRenting = async (
  rent_title,
  rent_type,
  rent_rooms,
  rent_description,
  rent_price,
  rent_location,
  rent_cover,
  services,
  rent_owner
) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
      INSERT INTO rentings (rent_title, rent_type, rent_rooms, rent_description, rent_price, rent_location, rent_cover, rent_owner)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        rent_title,
        rent_type,
        rent_rooms,
        rent_description,
        rent_price,
        rent_location,
        rent_cover,
        rent_owner,
      ]
    );

    const rentID = result.insertId;
    const {
      elevator,
      near_beach,
      near_mountain,
      hairdryer,
      washing_machine,
      ac,
      smoke_detector,
      first_kit_aid,
      wifi,
      refrigerator,
      freezer,
      toaster,
      fully_equipped,
    } = services;

    const [rent_services] = await connection.query(
      `
         INSERT INTO services (renting_id, elevator, near_beach, near_mountain, hairdryer, washing_machine, ac, smoke_detector, first_kit_aid, wifi, refrigerator, freezer, toaster, fully_equipped)
         VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        rentID,
        elevator,
        near_beach,
        near_mountain,
        hairdryer,
        washing_machine,
        ac,
        smoke_detector,
        first_kit_aid,
        wifi,
        refrigerator,
        freezer,
        toaster,
        fully_equipped,
      ]
    );

    return result.data;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { createRenting };
