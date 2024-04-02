const {
  sendCancelRental,
} = require('../../db/queries/rentals/sendCancelRental.js');
const jwt = require('jsonwebtoken');
const cancelRental = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;
    const { id } = req.params;

    await sendCancelRental(username, id);

    res.send({
      status: 'ok',
      message: `¡Has cancelado el alquiler ${id}!`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = cancelRental;
