const { User, Categories, Products } = require('../models/index');

const { ObjectId } = require('mongoose').Types;
const allowedCollections = ['users', 'roles', 'categories', 'products'];

// search users
const searchUsers = async (term = '', res) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.find({ _id: term, state: true });
    return res.json({
      results: [user],
    });
  }

  const regex = new RegExp(term, 'i');

  const user = await User.find({
    $or: [{ name: regex }, { email: regex }, { role: regex }],
    $and: [{ state: true }],
  });

  return res.json({
    results: user,
  });
};

// search categories
const searchCategories = async (term = '', res) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const category = await Categories.findById(term).populate('user', 'name');
    return res.json({
      results: [category],
    });
  }
  const regex = new RegExp(term, 'i');

  const category = await Categories.find({
    name: regex,
    $and: [{ state: true }],
  }).populate('user', 'name');

  return res.json({
    results: category,
  });
};

// search products
const searchProducts = async (term = '', res) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const product = await Products.find({
      _id: term,
      state: true,
    })
      .populate('user', 'name')
      .populate('category', 'name');

    return res.json({
      results: [product],
    });
  }
  const regex = new RegExp(term, 'i');

  const product = await Products.find({
    name: regex,
    $and: [{ state: true }],
  })
    .populate('user', 'name')
    .populate('category', 'name');
  return res.json({
    results: product,
  });
};

const search = async (req, res) => {
  const { collection, term } = req.params;

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      message: `Alowed collections are (${allowedCollections})`,
    });
  }

  switch (collection) {
    case 'users':
      searchUsers(term, res);
      break;
    case 'categories':
      searchCategories(term, res);
      break;
    case 'products':
      searchProducts(term, res);
      break;
    default:
      return res.status(500).json({
        message: 'Error',
      });
  }
};

module.exports = { search, allowedCollections };
