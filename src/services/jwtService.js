require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtService = {
  generateToken: (email) => {
    const token = jwt.sign({ user: email }, JWT_SECRET, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  },

  validateToken: (token) => {
    try {
      const decode = jwt.verify(token, JWT_SECRET);
      return decode;
    } catch (error) {
      throw new Error('Invalid Token');
    }
  },
};

module.exports = jwtService;