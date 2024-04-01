const {
  getMyRentingsId,
} = require('../../db/queries/rentals/getMyRentingsId.js');
const jwt = require('jsonwebtoken');

const myRentingsId = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;
    const { id } = req.params;

    const userRentals = await getMyRentingsId(id, username);

    res.send({
      status: 'ok',
      message: 'Listado de peticiones: ',
      data: userRentals,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = myRentingsId;
