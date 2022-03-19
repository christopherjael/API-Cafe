const { Roles, User } = require('../models/index');

//verificar si el role es valido
const isAvaliableRole = async (role = '') => {
  const roleExists = await Roles.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role (${role}) does not exist in the database`);
  }
};

//verificar si el correo ya existe
const isEmailUsed = async (email = '') => {
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    throw new Error('This email already exists');
  }
};

const existUserById = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error('There is no user with this id: ' + id);
  }
};

module.exports = { isAvaliableRole, isEmailUsed, existUserById };
