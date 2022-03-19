const validateFields = require('../middlewares/validatorFields');
const validatorJWT = require('../middlewares/validatorJWT');
const validatorRole = require('../middlewares/validatorRole');
const validatorCategory = require('../middlewares/validatorCategory');

module.exports = {
  ...validatorRole,
  ...validateFields,
  ...validatorJWT,
  ...validatorCategory,
};
