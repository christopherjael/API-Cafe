const validateFields = require('../middlewares/validatorFields');
const validatorJWT = require('../middlewares/validatorJWT');
const validatorRole = require('../middlewares/validatorRole');
const validatorCategory = require('../middlewares/validatorCategory');
const validatorFiles = require('../middlewares/validatorFiles');

module.exports = {
  ...validatorRole,
  ...validateFields,
  ...validatorJWT,
  ...validatorCategory,
  ...validatorFiles,
};
