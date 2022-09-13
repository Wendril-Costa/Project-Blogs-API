const { User } = require('../database/models');
const { jwtService } = require('./jwtService');

const login = async ({ email, password }) => {
  if (!email || !password) {
    return { code: 400, message: 'Some required fields are missing' };
  }
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return { code: 400, message: 'Invalid fields' };
  }

  const token = jwtService.generateToken(email);

  return { code: 200, token };
};

module.exports = {
    login,
};