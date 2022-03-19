const { model, Schema } = require('mongoose');

const CategoriesSchema = new Schema({
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

CategoriesSchema.methods.toJSON = function () {
  const { __v, state, ...data } = this.toObject();
  return data;
};

module.exports = model('Categories', CategoriesSchema);
