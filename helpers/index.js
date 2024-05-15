const { generateError } = require('./generateError');
const { createPathIfNotExists } = require('./createPathIfNotExists');
const sendMail = require('./sendMail');

module.exports = { generateError, sendMail, createPathIfNotExists };
