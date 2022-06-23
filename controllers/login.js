const validator = require('validator');
const bcrypt = require('bcrypt');
const router = require('express').Router();

const jwt = require('jsonwebtoken');
const user = require('../models/user');

const { errorHandler, errorHandler2 } = require('../middlewares/errorHandler');

const {
  ERROR_401_CODE,
  ERROR_403_CODE,
  INCORRECT_PASSWORD,
  DEFAULT_ERROR_CODE,
  INCORRECT_EMAIL_FORMAT,
  INCORRECT_DATA_CODE,
  JWT_SECRET,
} = require('../utils/constants');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(INCORRECT_DATA_CODE).send({ message: INCORRECT_PASSWORD });
    return;
  }

  user
    .findOne({ email })
    .select('+password')
    .then((currentUser) => {
      if (!currentUser) {
        return res.status(ERROR_401_CODE).send({ message: INCORRECT_PASSWORD });
      }
      bcrypt.compare(password, currentUser.password, (error, isValid) => {
        if (error) {
          return res.status(INCORRECT_DATA_CODE).send({ message: error });
        }
        if (isValid) {
          const token = jwt.sign({ _id: currentUser._id }, JWT_SECRET, {
            expiresIn: '7d',
          });
          return res
            .cookie('jwt', token, {
              httpOnly: true,
              secure: false, // https
              sameSite: true,
            })
            .status(200)
            .send({ email: currentUser.email, name: currentUser.name });
        }
        return res.status(ERROR_403_CODE).send({ message: INCORRECT_PASSWORD });
      });
    })
    .catch(() => {
      res.status(ERROR_401_CODE).send({ message: INCORRECT_PASSWORD });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  if (!validator.isEmail(email)) {
    res.status(DEFAULT_ERROR_CODE).send({ message: INCORRECT_EMAIL_FORMAT });

    return;
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      user
        .create({
          name,
          about,
          avatar,
          email,
          password: hash,
        })
        .then((data) => res.send({ data }))
        .catch((err) => {
          errorHandler(res, err);
        });
    })
    .catch((err) => {
      errorHandler(res, err);
    });
};
