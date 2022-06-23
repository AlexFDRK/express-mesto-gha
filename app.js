const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const { ERROR_404_CODE, ERROR_404_TEXT } = require('./utils/constants');
const { login, createUser } = require('./controllers/login');
const { auth } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'ru'] },
      }),
      password: Joi.string().required().min(2),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
      avatar: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
    }),
  }),
  createUser,
);

app.use(auth);

app.use('/users', require('./routers/users'));
app.use('/cards', require('./routers/cards'));

app.get('/', (_req, res) => {
  res.send({ message: 'Main page' });
});

app.use('*', (_req, res) => {
  res.status(ERROR_404_CODE).send({ message: ERROR_404_TEXT });
});

app.use(errors());

app.use((err, req, res, next) => {
  res
    .status(500)
    .send({ message: 'На сервере произошла ошибка!!!!!!!!!!!!!!!!!!!!!' });
  next();
});

app.listen(PORT, () => {
  console.log(`Listeninng port ${PORT}`);
});
