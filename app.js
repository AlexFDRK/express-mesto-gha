const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const express = require('express');
const { ERROR_404_CODE, ERROR_404_TEXT } = require('./utils/constants');
const { login, createUser } = require('./controllers/login');
const { auth } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', require('./routers/users'));
app.use('/cards', require('./routers/cards'));

app.get('/', (_req, res) => {
  res.send({ message: 'Main page' });
});

app.use('*', (_req, res) => {
  res.status(ERROR_404_CODE).send({ message: ERROR_404_TEXT });
});

app.listen(PORT, () => {
  console.log(`Listeninng port ${PORT}`);
});
