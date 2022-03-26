const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile, updateImg, getImg } = require('../controllers/index');
const { validateFields, validatorFiles } = require('../middlewares/index');
const { allowedCollections } = require('../helpers/index');
const router = Router();

// upload file
router.post('/', validatorFiles, uploadFile);

// update image
router.put(
  '/:collection/:id',
  [
    validatorFiles,
    check('id', 'This id is not Mongoid').isMongoId(),
    check('collection').custom((collection) =>
      allowedCollections(collection, ['users', 'products'])
    ),
    validateFields,
  ],
  updateImg
);

router.get(
  '/:collection/:id',
  [
    check('id', 'This id is not Mongoid').isMongoId(),
    check('collection').custom((collection) =>
      allowedCollections(collection, ['users', 'products'])
    ),
    validateFields,
  ],
  getImg
);

module.exports = router;
