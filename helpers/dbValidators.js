const Role = require("../models/roles");
const User = require("../models/user");

//verificar si el role es valido
const isAvaliableRole = async(role = '') => {
    const roleExists = await Role.findOne({role});
    if (!roleExists) {
        throw new Error(`Role (${role}) does not exist in the database`)
    };
};

//verificar si el correo ya existe
const isEmailUsed = async(email = '') => {     
    const emailExists = await User.findOne({email})

    if( emailExists ){
        throw new Error('This email already exists')
    }
};

module.exports = {isAvaliableRole, isEmailUsed}