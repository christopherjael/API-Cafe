const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const {
  createProducts,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');

const {
  validatorJWT,
  validateFields,
  isAdmin,
} = require('../middlewares/index');

const { validatorCategory } = require('../middlewares/validatorCategory');

// get all Products
router.get('/', getProducts);

// get Products by id
router.get(
  '/:id',
  [check('id', 'ID has to be a valid mongo id').isMongoId(), validateFields],
  getProductById
);

// create a new Products
router.post(
  '/',
  [
    validatorJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    validatorCategory,
    validateFields,
  ],
  createProducts
);

// update a Products
router.put(
  '/:id',
  [
    validatorJWT,
    isAdmin,
    check('id', 'ID has to be a valid mongo id').isMongoId(),
    validateFields,
  ],
  updateProduct
);

// delete a Products
router.delete(
  '/:id',
  [
    validatorJWT,
    isAdmin,
    check('id', 'ID has to be a valid mongo id').isMongoId(),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
