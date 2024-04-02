const { getMyRentals } = require('../../db/queries/rentals/getMyRentals.js');
const jwt = require('jsonwebtoken');

const myRentals = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;

    const userRentals = await getMyRentals(username);

    res.send({
      status: 'ok',
      message: 'Listado de peticiones enviadas: ',
      data: userRentals,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = myRentals;
