const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

const loginService = {
  login: async ({ email, password }) => {
    if (!email || !password) {
      return { code: 400, message: 'Some required fields are missing' };
    }
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return { code: 400, message: 'Invalid fields' };
    }

    const data = { email: user.dataValues.email };
    const token = jwt.sign(data, JWT_SECRET, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

    return { code: 200, token };
  },
};

module.exports = {
    loginService,
};