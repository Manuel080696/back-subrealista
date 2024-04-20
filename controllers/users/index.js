const createNewUser = require('./newUser');
const validateUser = require('./validateUser');
const loginUser = require('./loginUser.js');
const getUserProfile = require('./getUserProfile.js');
const updateProfile = require('./updateProfile.js');
const getRentings = require('./getRentings.js');
const sendEmailPassword = require('./sendEmailPassword.js');
const changePassword = require('./changePassword.js');

module.exports = {
  createNewUser,
  validateUser,
  loginUser,
  getUserProfile,
  updateProfile,
  getRentings,
  sendEmailPassword,
  changePassword,
};
