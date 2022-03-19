const { Categories } = require('../models/index');
const validatorCategory = async (req, res, next) => {
  const category = req.body.category.toLocaleUpperCase();

  const productExists = await Categories.findOne({
    name: category,
  });

  if (!productExists) {
    return res.json({ message: `Product ${category} not exists` });
  }

  req.category = productExists._id;
  next();
};

module.exports = { validatorCategory };
