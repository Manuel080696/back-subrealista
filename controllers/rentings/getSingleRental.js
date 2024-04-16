const { getRental } = require('../../db/queries/rentings/getRental.js');

const getSinglerentings = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rentings = await getRental(id);
    res.send({
      status: 'ok',
      data: rentings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getSinglerentings;
