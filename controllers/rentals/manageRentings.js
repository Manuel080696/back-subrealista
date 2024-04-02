const {
  updateRentalRequest,
} = require('../../db/queries/rentals/updateRentalRequest.js');
const jwt = require('jsonwebtoken');

const manageRentings = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;
    const { rental_status } = req.body;
    const { id } = req.params;

    await updateRentalRequest(username, rental_status, id);

    if (rental_status === 'Aceptado') {
      res.send({
        status: 'ok',
        message: `¡El alquiler ${id} ha sido aceptado!`,
      });
    } else {
      res.send({
        status: 'ok',
        message: `¡El alquiler ${id} ha sido rechazado!`,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = manageRentings;
