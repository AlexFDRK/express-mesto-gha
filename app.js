const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const { login, createUser } = require('./controllers/login');
const { auth } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();
const { ERROR_404_TEXT } = require('./utils/constants');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email({
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
      email: Joi.string()
        .required()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'ru'] },
        }),
      password: Joi.string().required().min(2),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/(https?:\/\/)(w{3}\.)?(\w|\-|\_)*.[a-zA-Z]{2,3}(\w|\W)*/),
    }),
  }),
  createUser,
);

app.use(auth);

app.use('/users', require('./routers/users'));
app.use('/cards', require('./routers/cards'));

app.use('*', (_req, res) => {
  res.status(404).send({ message: ERROR_404_TEXT });
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Listeninng port ${PORT}`);
});
