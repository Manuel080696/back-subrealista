const { getUserId } = require('../../db/queries/users/getUserId.js');
const {
  getUserRentings,
} = require('../../db/queries/users/getUserRentings.js');

const getRentings = async (req, res, next) => {
  try {
    const username = req.params.username;
    const userId = await getUserId(username);
    const rentings = await getUserRentings(userId);
    res.send({
      status: 'ok',
      data: rentings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getRentings;
