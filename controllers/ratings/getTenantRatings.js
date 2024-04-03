const selectTenantRatings = require('../../db/queries/ratings/selectTenantRatings.js');

const getTenantRatings = async (req, res, next) => {
  try {
    const { username } = req.params;
    const tenantRatings = await selectTenantRatings(username);

    res.send({
      status: 'ok',
      data: tenantRatings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getTenantRatings;
