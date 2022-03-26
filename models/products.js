const { model, Schema } = require('mongoose');

const ProductsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  available: {
    type: Boolean,
    default: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
  },
  description: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  img: { type: String },
});

ProductsSchema.methods.toJSON = function () {
  const { __v, state, ...data } = this.toObject();
  return data;
};

module.exports = model('Product', ProductsSchema);
