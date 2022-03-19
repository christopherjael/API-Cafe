const { Router } = require('express');
const { check } = require('express-validator');
const {
  createCategories,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');
const router = Router();

const {
  validatorJWT,
  validateFields,
  isAdmin,
} = require('../middlewares/index');

// get all categories
router.get('/', getCategories);

// get category by id
router.get(
  '/:id',
  [check('id', 'ID has to be a valid mongo id').isMongoId(), validateFields],
  getCategoryById
);

// create a new category
router.post(
  '/',
  [
    validatorJWT,
    check('name', 'name is required').not().isEmpty(),
    validateFields,
  ],
  createCategories
);

// update a category
router.put(
  '/:id',
  [
    validatorJWT,
    isAdmin,
    check('id', 'ID has to be a valid mongo id').isMongoId(),
    validateFields,
  ],
  updateCategory
);

// delete a category
router.delete(
  '/:id',
  [
    validatorJWT,
    isAdmin,
    check('id', 'ID has to be a valid mongo id').isMongoId(),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
