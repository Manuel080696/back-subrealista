const { createRenting } = require('../../db/queries/rentings/createRenting.js');

const newRenting = async (req, res, next) => {
  try {
    const {
      rent_title,
      rent_type,
      rent_rooms,
      rent_description,
      rent_price,
      rent_location,
    } = req.body;

    const rent_id = await createRenting(
      rent_title,
      rent_type,
      rent_rooms,
      rent_description,
      rent_price,
      rent_location,
      req.userId
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
