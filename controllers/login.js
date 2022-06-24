const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const user = require('../models/user');

const {
  ERROR_401_CODE,
  ERROR_403_CODE,
  INCORRECT_PASSWORD,
  INCORRECT_DATA_CODE,
  JWT_SECRET,
} = require('../utils/constants');

module.exports.login = (req, res, next) => {
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
        return res.status(ERROR_403_CODE).send({ message: INCORRECT_PASSWORD });
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
        .then((data) => res.send({ data }))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
