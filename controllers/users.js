const user = require('../models/user');
const СustomError = require('../utils/customError');

module.exports.getUsers = (req, res, next) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.findUserById = (req, res, next) => {
  user
    .findById(req.params.id)
    .then((data) => {
      if (!data) {
        next(new СustomError(`Запрошены данные с некорректным id ${req.params.id}`, 404));
      } else {
        res.send({ data });
      }
    })
    .catch((err) => next(err));
};

module.exports.getMe = (req, res, next) => {
  user
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

  user
    .findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
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

  user
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
