const loginService = require('../services/loginService');

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const { code, message, token } = await loginService.login({ email, password });
  
      if (message) return res.status(code).json({ message });
  
      return res.status(code).json({ token });
    } catch (error) {
      console.log(error.message);
  
      return res.status(500).json({ message: 'Erro Interno' });
    }
};

module.exports = {
    login,
};