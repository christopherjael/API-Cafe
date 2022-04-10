const { Categories } = require('../models');

// CREATE A NEW CATEGORY
const createCategories = async (req, res) => {
  const name = req.body.name.toUpperCase();

  const categoryExists = await Categories.findOne({ name });

  if (categoryExists) {
    return res.json({ message: `Category ${name} is already exists` });
  }

  const data = {
    name,
    user: req.user._id,
  };

  const category = new Categories(data);
  await category.save();

  res.status(201).json(category);
};

// GET ALL Categories
const getCategories = async (req, res) => {
  const { limit = 5, skip = 0 } = req.query;
  const query = { state: true };

  const [count, categories] = await Promise.all([
    Categories.countDocuments(query),
    Categories.find(query).populate('user', 'email').limit(limit).skip(skip),
  ]);

  res.status(200).json({
    numberOfDocuments: count,
    categories,
  });
};

// GET CATEGORY BY ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const category = await Categories.findById({ _id: id }).populate(
    'user',
    'email'
  );

  if (!category) {
    return res.json({ message: 'Category not found' });
  }

  if (category.state === false) {
    return res.json({ message: 'Category is deleted' });
  }

  res.status(200).json({ category });
};

// UPDATE A CATEGORY
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const name = req.body.name.toUpperCase();
  const user = req.user._id;
  const data = { name, user };

  const category = await Categories.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });

  res.json({ category });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Categories.findByIdAndUpdate(
    { _id: id },
    { state: false }
  );

  res.json({ category });
};

module.exports = {
  createCategories,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
