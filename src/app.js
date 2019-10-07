const express = require('express');
const userControllers = require('./controllers/users');

const app = express();
app.use(express.json());

app.post('/users', userControllers.create);

module.exports = app;
