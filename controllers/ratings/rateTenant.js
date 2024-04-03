const {
  postRateTenant,
} = require('../../db/queries/ratings/postRateTenant.js');

const rateTenant = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;
    const { rating, comments } = req.body;
    const { id } = req.params;

    const rateInfo = await postRateTenant(username, id, rating, comments);

    res.send({
      status: 'ok',
      data: rateInfo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = rateTenant;
