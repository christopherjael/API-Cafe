const { response, request } = require('express');
const { User } = require('../models/index');
const bcryptjs = require('bcryptjs');

// get all users
const usuariosGet = async (req = request, res = response) => {
  const { limit = 5, skip = 0 } = req.query;

  const query = { state: true };

  const [totalDocuments, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(skip).limit(limit),
  ]);

  res.json({ totalDocuments, users });
};

// get usre by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.json(user);
};

// create a new user
const usuariosPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  await user.save();
  res.json({ user });
};

// updata a user
const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { __id, password, google_auth, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({ user });
};

// delete a user
const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { state: false });
  res.json({
    user,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  getUserById,
};
