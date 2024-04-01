const postRental = require('../../db/queries/rentals/postRental.js');
const jwt = require('jsonwebtoken');

const bookRental = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;
    const { id } = req.params;
    const { rental_start, rental_end } = req.body;

    const confirmation = await postRental(
      id,
      username,
      rental_start,
      rental_end
    );

    res.send({
      status: 'ok',
      message: `Reserva con id ${confirmation} creada con exito`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = bookRental;
