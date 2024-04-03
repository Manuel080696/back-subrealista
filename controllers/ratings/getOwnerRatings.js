const selectOwnerRatings = require('../../db/queries/ratings/selectOwnerRatings.js');

const getOwnerRatings = async (req, res, next) => {
  try {
    const { username } = req.params;
    const tenantRatings = await selectOwnerRatings(username);

    res.send({
      status: 'ok',
      data: tenantRatings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getOwnerRatings;
