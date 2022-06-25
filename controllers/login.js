const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const user = require('../models/user');
const СustomError = require('../utils/customError');

const { AUTHORIZATION_ERROR_TEXT, JWT_SECRET } = require('../utils/constants');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new СustomError('AUTHORIZATION_ERROR_TEXT', 400));
    return;
  }

  user
    .findOne({ email })
    .select('+password')
    .then((currentUser) => {
      if (!currentUser) {
        return next(new СustomError(AUTHORIZATION_ERROR_TEXT, 401));
      }
      bcrypt.compare(password, currentUser.password, (error, isValid) => {
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
              secure: false, // https
              sameSite: true,
            })
            .status(200)
            .send({ email: currentUser.email, name: currentUser.name });
        }
        return next(new СustomError(AUTHORIZATION_ERROR_TEXT, 403));
      });
    })
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

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
        .then((data) =>
          res.send({
            name: data.name,
            about: data.about,
            avatar: data.avatar,
            email: data.email,
          })
        )
        .catch((err) => next(new СustomError(err, 409)));
    })
    .catch((err) => next(err));
};
