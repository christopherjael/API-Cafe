const bcryptjs = require('bcryptjs');
const { jwtGenerator } = require('../helpers/jwtGenerator');
const User = require('../models/user')

const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Email and password invalid' });
        };

        if (!user.state) {
            return res.status(400).json({ message: 'Email and password invalid, state: false' });
        };

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Email and password invalid' });
        };

        const token = await jwtGenerator(user._id)


        res.json({
            user,
            token
        });

    } catch (error) {

        console.error(error.message);
        return res.status(500).json({
            error: error.message
        });

    };
};

module.exports = {
    login
};