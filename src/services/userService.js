const { User } = require('../database/models');
const { jwtService } = require('./jwtService');

const userService = {
  
    create: async ({ displayName, email, password, image }) => {
        await User.create({ displayName, email, password, image });

        const token = jwtService.generateToken(email);

        return { code: 201, token };
    },

    findAll: async () => {
        const users = await User.findAll({ attributes: { exclude: 'password' } });

        return { code: 200, users };
    },

    findByPk: async (id) => {
        const user = await User.findByPk(id, { attributes: { exclude: 'password' } });
      
        if (!user) {
          return { code: 404, message: 'User does not exist' };
        }
      
        return { code: 200, user };
    },
};

module.exports = {
    userService,
};