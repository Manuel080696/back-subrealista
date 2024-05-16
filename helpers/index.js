const { generateError } = require('./generateError');
const { createUpload } = require('./createUpload');
const sendMail = require('./sendMail');

module.exports = { generateError, sendMail, createUpload };
