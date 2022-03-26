const dbValidators = require('./dbValidators');
const googleVerify = require('./google-verify');
const jwtGenerator = require('./jwtGenerator');
const uploadFiles = require('./uploadFiles');

module.exports = {
  ...dbValidators,
  ...googleVerify,
  ...jwtGenerator,
  ...uploadFiles,
};
