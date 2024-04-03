const getUserUnrated = require('../../db/queries/ratings/getUserUnrated.js');

const getPendingRatings = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;

    const unratedRatings = await getUserUnrated(username);

    res.send({
      status: 'ok',
      data: ratings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getPendingRatings;
