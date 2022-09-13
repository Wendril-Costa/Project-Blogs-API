const express = require('express');

require('express-async-errors');

const { loginController } = require('./controllers/loginController');
const { userController } = require('./controllers/userController');
const { userMiddleware } = require('./middlewares/userMiddleware');

const app = express();

app.use(express.json());

app.post('/login', loginController.login);
app.post('/user', userMiddleware.userValid, userMiddleware.checkExist, userController.create);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
