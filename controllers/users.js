const User = require('../models/user');
const СustomError = require('../utils/customError');
const { INCORRECT_ID_ERROR_TEXT } = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.findUserById = (req, res, next) => {
  User
    .findById(req.params.id)
    .then((data) => {
      if (!data) {
        next(new СustomError(`${INCORRECT_ID_ERROR_TEXT} ${req.params.id}`, 404));
      } else {
        res.send({ data });
      }
    })
    .catch((err) => next(err));
};

module.exports.getMe = (req, res, next) => {
  User
    .findById(req.user)
    .select('-password')
    .then((data) => {
      if (!data) {
        next(req.params.id);
      } else {
        res.send({ data });
      }
    })
    .catch((err) => next(err));
};

module.exports.patchMe = (req, res, next) => {
  const { name, about } = req.body;
  const _id = req.user;

  User
    .findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .select('-password')
    .then((data) => {
      if (data) {
        res.send({ data });
      } else {
        next(req.params.id);
      }
    })
    .catch((err) => next(err));
};

module.exports.patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const _id = req.user;

  User
    .findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      if (data) {
        res.send({ data });
      } else {
        next(req.params.id);
      }
    })
    .catch((err) => next(err));
};
