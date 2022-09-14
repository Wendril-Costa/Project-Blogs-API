const express = require('express');

require('express-async-errors');

const { jwtService } = require('./services/jwtService');
const { loginController } = require('./controllers/loginController');
const { userController } = require('./controllers/userController');
const { userMiddleware } = require('./middlewares/userMiddleware');
const { categoryController } = require('./controllers/categoryController');
const { postController } = require('./controllers/postController');

const app = express();

app.use(express.json());

app.post('/login', loginController.login);
app.post('/user', userMiddleware.userValid, userMiddleware.checkExist, userController.create);
app.get('/user', jwtService.validateToken, userController.findAll);
app.get('/user/:id', jwtService.validateToken, userController.findByPk);
app.post('/categories', jwtService.validateToken, categoryController.create);
app.get('/categories', jwtService.validateToken, categoryController.findAll);
app.post('/post', jwtService.validateToken, postController.create);
app.get('/post', jwtService.validateToken, postController.findAll);
app.get('/post/:id', jwtService.validateToken, postController.findOne);
app.put('/post/:id', jwtService.validateToken, postController.update);
app.delete('/post/:id', jwtService.validateToken, postController.delPost);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
