const path = require('path');
const fs = require('fs');
const { uploadFiles } = require('../helpers/index');
const { User, Products } = require('../models/index');

// upload files
const uploadFile = async (req, res) => {
  try {
    const pathComplete = await uploadFiles(req.files, undefined, 'imgs');

    res.json({ message: pathComplete });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// update img
const updateImg = async (req, res) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({ message: 'User not found' });
      }
      break;

    case 'products':
      model = await Products.findById(id);
      if (!model) {
        return res.status(400).json({ message: 'Product not found' });
      }
      break;

    default:
      return res.status(500).json({ message: 'Invalid collection condition' });
  }

  if (model.img) {
    const pathImg = path.join(__dirname, '../uploads', collection, model.img);
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg);
    }
  }

  model.img = await uploadFiles(req.files, undefined, collection);

  await model.save();

  res.json({ model });
};

// get img
const getImg = async (req, res) => {
  const { collection, id } = req.params;

  let model;

  const pathImgDefault = path.join(
    __dirname,
    '../uploads',
    collection,
    'default.png'
  );

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).sendFile(pathImgDefault);
      }
      break;

    case 'products':
      model = await Products.findById(id);
      if (!model) {
        return res.status(400).sendFile(pathImgDefault);
      }
      break;

    default:
      return res.status(500).json({ message: 'Invalid collection condition' });
  }

  if (!model.img) {
    return res.status(400).json({ message: `this register haven't image` });
  }

  const pathImg = path.join(__dirname, '../uploads', collection, model.img);

  if (!fs.existsSync(pathImg)) {
    return res.status(500).json({ message: 'Image not found on server' });
  }

  return res.sendFile(pathImg);
};

module.exports = { uploadFile, updateImg, getImg };
