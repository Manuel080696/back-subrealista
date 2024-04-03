const { postRateOwner } = require('../../db/queries/ratings/postRateOwner.js');

const rateOwner = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;
    const { rating, comments } = req.body;
    const { id } = req.params;

    const rateInfo = await postRateOwner(username, id, rating, comments);

    res.send({
      status: 'ok',
      data: rateInfo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = rateOwner;
