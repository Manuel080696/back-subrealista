const { getRentings } = require('../../db/queries/rentings/getRentings.js');

const getAllRentings = async (req, res, next) => {
  try {
    const rentings = await getRentings();
    res.send({
      status: 'ok',
      data: rentings,
    });
  } catch (error) {
    res.send({
      error: '400',
      message: 'No encontrado',
    });
  }
};

module.exports = getAllRentings;
