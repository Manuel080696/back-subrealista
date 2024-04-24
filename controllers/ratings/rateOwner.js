const { postRateOwner } = require('../../db/queries/ratings/postRateOwner.js');
const jwt = require('jsonwebtoken');

const rateOwner = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;
    const { rating, comments } = req.body;
    const { id } = req.params;

    console.log(id);

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
