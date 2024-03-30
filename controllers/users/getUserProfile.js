const getProfile = require('../../db/queries/users/getProfile.js');

const getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await getProfile(username);
    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    res.send({
      error: '400',
      message: 'No encontrado',
    });
  }
};

module.exports = getUserProfile;
