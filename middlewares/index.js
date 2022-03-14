const validateFields = require("../middlewares/validatorFields");
const validatorJWT = require("../middlewares/validatorJWT");
const validatorRole = require("../middlewares/validatorRole");

module.exports = {
  ...validatorRole,
  ...validateFields,
  ...validatorJWT,
};
