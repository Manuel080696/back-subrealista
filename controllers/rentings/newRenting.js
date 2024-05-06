const { createRenting } = require('../../db/queries/rentings/createRenting.js');
const path = require('path');
const { randomUUID } = require('crypto');
const { createPathIfNotExists } = require('../../helpers/generateError.js');
const sharp = require('sharp');
const jwt = require('jsonwebtoken');

const newRenting = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;

    const HOST =
      'http://' +
      (process.env.HOST || 'localhost') +
      ':' +
      (process.env.PORT || 3000);

    const {
      rent_title,
      rent_type,
      rent_rooms,
      rent_description,
      rent_price,
      rent_location,
      rent_address,
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
    } = req.body;

    const services = {
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
    };

    let address = '';
    if (rent_address.street.length > 0) {
      address.concat(rent_address.street);
    }
    if (rent_address.city.length > 0) {
      address.concat(rent_address.city);
    }
    if (rent_address.state.length > 0) {
      address.concat(rent_address.state);
    }
    if (rent_address.postalCode.length > 0) {
      address.concat(rent_address.postalCode);
    }

    const rent_id = await createRenting(
      rent_title,
      rent_type,
      rent_rooms,
      rent_description,
      rent_price,
      address,
      rent_location,
      services,
      username
    );

    res.send({
      status: 'ok',
      rent_id,
      data: {
        rent_title,
        rent_type,
        rent_rooms,
        rent_description,
        rent_price,
        rent_location,
      },
      message: `${rent_title} se ha publicado con éxito.`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = newRenting;
