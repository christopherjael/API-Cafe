const bcryptjs = require('bcryptjs');
const { jwtGenerator } = require('../helpers/jwtGenerator');
const { googleVerify } = require('../helpers/google-verify');
const { User } = require('../models/index');

const salt = bcryptjs.genSaltSync(10);

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Email and password invalid' });
    }

    if (!user.state) {
      return res
        .status(400)
        .json({ message: 'Email and password invalid, state: false' });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Email and password invalid' });
    }

    const token = await jwtGenerator(user._id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const googleSignIn = async (req, res) => {
  const { id_token } = req.body;

  try {
    const { name, email, picture } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: bcryptjs.hashSync('admin123', salt),
        picture,
        google_auth: true,
        role: 'USER_ROLE',
      };

      user = new User(data);
      await user.save();
    }

    if (!user.state) {
      return res.status(401).json({
        message: 'This user is deleted',
      });
    }

    const token = await jwtGenerator(user._id);

    res.json({
      message: 'Google signed',
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
