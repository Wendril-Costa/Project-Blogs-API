const { User } = require('../database/models');
const { jwtService } = require('./jwtService');

const userService = {
  
    create: async ({ displayName, email, password, image }) => {
        await User.create({ displayName, email, password, image });

        const token = jwtService.generateToken(email);

        return { code: 201, token };
    },
};

module.exports = {
    userService,
};