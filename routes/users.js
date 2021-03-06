const { Router } = require('express');
const { check } = require('express-validator');

const {
  usuariosGet,
  getUserById,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require('../controllers/users');
const {
  isAvaliableRole,
  isEmailUsed,
  existUserById,
} = require('../helpers/dbValidators');

const { validateFields, validatorJWT, isRole } = require('../middlewares');

const router = Router();

router.get('/', usuariosGet);

router.get(
  '/:id',
  [check('id', 'This id is not Mongoid').isMongoId()],
  getUserById
);

router.put(
  '/:id',
  [
    check('id', 'This id is not Mongoid').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isAvaliableRole),
    validateFields,
  ],
  usuariosPut
);

router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is not available').isEmail(),
    check('email').custom(isEmailUsed),
    check(
      'password',
      'Password cannot be empty and cannot be less than 6 characters'
    )
      .notEmpty()
      .isLength({
        min: 6,
      }),
    check('role').custom(isAvaliableRole),
    validateFields,
  ],
  usuariosPost
);

router.delete(
  '/:id',
  [
    validatorJWT,
    isRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'This id is not Mongoid').isMongoId(),
    check('id').custom(existUserById),
    validateFields,
  ],
  usuariosDelete
);

module.exports = router;
