const { userService } = require('../services/userService');

const userController = {
    create: async (req, res) => {
        const { displayName, email, password, image } = req.body;
      
        try {
          const { code, message, token } = await userService
          .create({ displayName, email, password, image });
      
          if (message) return res.status(code).json({ message });
      
          return res.status(code).json({ token });
        } catch (error) {
          return res.status(500).json({ message: 'Erro Interno' });
        }
    },

    findAll: async (_req, res) => {
        try {
            const { code, users } = await userService.findAll();
        
            return res.status(code).json(users);
          } catch (error) {
            console.log(error.message);
        
            return res.status(500).json({ message: 'Erro Interno' });
          }
    },
};

module.exports = {
    userController,
};