const { updateRent } = require('../../db/queries/rentings/updateRent.js');
const jwt = require('jsonwebtoken');

const updateRenting = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const rent_owner = decodedToken.id;
    const rent_id = req.params.id;

    const newData = {
      ...(req.body.rent_title && { rent_title: req.body.rent_title }),
      ...(req.body.rent_type && { rent_type: req.body.rent_type }),
      ...(req.body.rent_rooms && { rent_rooms: req.body.rent_rooms }),
      ...(req.body.rent_description && {
        rent_description: req.body.rent_description,
      }),
      ...(req.body.rent_price && { rent_price: req.body.rent_price }),
      ...(req.body.rent_location && { rent_location: req.body.rent_location }),
    };

    const rowsAffected = await updateRent(
      newData.rent_title,
      newData.rent_type,
      newData.rent_rooms,
      newData.rent_description,
      newData.rent_price,
      newData.rent_location,
      rent_id,
      rent_owner
    );

    if (rowsAffected === 0) {
      return res
        .status(400)
        .json({ error: 'No hay ningún dato para actualizar' });
    }

    res.status(200).send({
      status: 'ok',
      data: { newData },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateRenting;
