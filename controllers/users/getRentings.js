const getUserRentings = require('../../db/queries/users/getUserRentings.js');

const getRentings = async (req, res, next) => {
  try {
    const username = req.params.username;
    const rentings = await getUserRentings(username);
    res.send({
      status: 'ok',
      data: rentings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getRentings;
