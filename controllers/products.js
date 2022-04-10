const { Products } = require('../models/index');

// CREATE A NEW CATEGORY
const createProducts = async (req, res) => {
  const { name, price, available, description } = req.body;

  const productExists = await Products.findOne({ name });

  if (productExists) {
    return res.json({ message: `Product ${name} is already exists` });
  }

  const data = {
    name,
    price,
    available,
    category: req.category._id,
    description,
    user: req.user._id,
  };

  const product = new Products(data);
  await product.save();

  res.status(201).json(product);
};

// GET ALL Products
const getProducts = async (req, res) => {
  const { limit = 5, skip = 0 } = req.query;
  const query = { state: true };

  const [count, products] = await Promise.all([
    Products.countDocuments(query),
    Products.find(query)
      .populate('user', 'email')
      .populate('category', 'name')
      .limit(limit)
      .skip(skip),
  ]);

  res.status(200).json({
    numberOfDocuments: count,
    products,
  });
};

// GET CATEGORY BY ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await Products.findById({ _id: id })
    .populate('user', 'email')
    .populate('category', 'name');

  if (!product) {
    return res.json({ message: 'Category not found' });
  }

  if (product.state === false) {
    return res.json({ message: 'Category is deleted' });
  }

  res.status(200).json({ product });
};

// UPDATE A CATEGORY
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, available } = req.body;
  const user = req.user._id;
  const data = { name, price, description, available, user };

  const categoryUpdated = await Products.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });

  res.json({ categoryUpdated });
};

// DELETE A PRODUCT
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Products.findByIdAndUpdate(
    { _id: id },
    { state: false }
  );

  res.json({ product });
};

module.exports = {
  createProducts,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
