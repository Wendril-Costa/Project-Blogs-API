const express = require('express');

require('express-async-errors');
// ...

const app = express();

app.use(express.json());

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
