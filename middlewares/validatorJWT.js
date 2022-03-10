const { request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validatorJWT = async (req = request, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        res.status(401).json({
            message: 'There are not token in the request'
        });
    };

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        req.user = await User.findById(uid);

        if (!req.user) {
            return res.status(401).json({
                message: 'Invalid user'
            })
        }

        if (req.user.state === false) {
            return res.status(401).json({
                message: 'Token not valid because the user is deleted'
            })
        }

        req.uid = uid;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: 'Invalid token'
        })
    }
}

module.exports = { validatorJWT };