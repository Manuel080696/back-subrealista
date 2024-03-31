const filtersToApply = require('../../db/queries/rentings/filtersToApply.js');

const filteredSearch = async (req, res) => {
  try {
    const rentings = await filtersToApply(req.query);

    res.send({
      status: 'ok',
      data: rentings,
    });
  } catch (error) {
    res.send({
      status: '400',
      error: error,
    });
  }
};

module.exports = filteredSearch;
