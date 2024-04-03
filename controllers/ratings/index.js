const getTenantRatings = require('./getTenantRatings.js');
const getOwnerRatings = require('./getOwnerRatings.js');
const getPendingRatings = require('./getPendingRatings.js');
const rateOwner = require('./rateOwner.js');
const rateTenant = require('./rateTenant.js');

module.exports = {
  getTenantRatings,
  getOwnerRatings,
  getPendingRatings,
  rateOwner,
  rateTenant,
};
