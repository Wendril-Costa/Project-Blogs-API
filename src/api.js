const express = require('express');

require('express-async-errors');

const { jwtService } = require('./services/jwtService');
const { loginController } = require('./controllers/loginController');
const { userController } = require('./controllers/userController');
const { userMiddleware } = require('./middlewares/userMiddleware');
const { categoryController } = require('./controllers/categoryController');

const app = express();

app.use(express.json());

app.post('/login', loginController.login);
app.post('/user', userMiddleware.userValid, userMiddleware.checkExist, userController.create);
app.get('/user', jwtService.validateToken, userController.findAll);
app.get('/user/:id', jwtService.validateToken, userController.findByPk);
app.post('/categories', jwtService.validateToken, categoryController.create);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
