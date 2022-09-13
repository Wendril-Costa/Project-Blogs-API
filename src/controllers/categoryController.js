const { categoryService } = require('../services/categoryService');

const categoryController = {
    create: async (req, res) => {
        const { name } = req.body;
      
        try {
          const { code, message, category } = await categoryService.create({ name });
      
          if (message) return res.status(code).json({ message });
      
          return res.status(code).json(category);
        } catch (error) {
          return res.status(500).json({ message: 'Erro Interno' });
        }
    },
};

module.exports = {
    categoryController,
};