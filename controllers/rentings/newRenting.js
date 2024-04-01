const { createRenting } = require('../../db/queries/rentings/createRenting.js');
const jwt = require('jsonwebtoken');

const newRenting = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;

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
