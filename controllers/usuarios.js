const { response, request } = require('express');
const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
}

const usuariosPost = async(req, res = response) => {
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role} );

    //verificar si el correo ya existe
    const emailExists = await User.findOne({email})
    
    if( emailExists ){
        return res.status(400).json({
            message: 'Email already exists'
        });
    };

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    res.json({
        msg: 'post API - usuariosPost',
        user
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}