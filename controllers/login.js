const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const СustomError = require('../utils/customError');

const {
  AUTHORIZATION_ERROR_TEXT,
  JWT_SECRET,
  ERROR_401,
  ERROR_409,
} = require('../utils/constants');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((currentUser) => {
      if (!currentUser) {
        return next(new СustomError(AUTHORIZATION_ERROR_TEXT, ERROR_401));
      }
      return bcrypt.compare(
        password,
        currentUser.password,
        (error, isValid) => {
          if (error) {
            return next(error);
          }
          if (isValid) {
            const token = jwt.sign({ _id: currentUser._id }, JWT_SECRET, {
              expiresIn: '7d',
            });
            return res
              .cookie('jwt', token, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
              })
              .status(200)
              .send({
                email: currentUser.email,
                name: currentUser.name,
                token,
              });
          }
          return next(new СustomError(AUTHORIZATION_ERROR_TEXT, ERROR_401));
        }
      );
    })
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((data) => res.status(201).send(data))
        .catch((err) => {
          if (err.code === 11000) {
            next(new СustomError(err.message, ERROR_409));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => next(err));
};
