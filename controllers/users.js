const {
  INCORRECT_DATA_CODE,
  NOT_FOUND_CODE,
  DEFAULT_ERROR_CODE,
  SERVER_ERROR_TEXT,
  NO_ID_ERROR_TEXT,
  INCORRECT_ID_ERROR_TEXT,
} = require('../constants/constants');

const user = require('../models/user');

module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: SERVER_ERROR_TEXT }));
};

module.exports.findUserById = (req, res) => {
  user
    .findById(req.params.id)
    .then((_user) => {
      if (!_user) {
        res.status(INCORRECT_DATA_CODE).send({
          message: `${NO_ID_ERROR_TEXT} ${req.params.id}`,
        });
      } else {
        res.send({ data: _user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(INCORRECT_DATA_CODE)
          .send({ message: INCORRECT_ID_ERROR_TEXT });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: SERVER_ERROR_TEXT });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  user
    .create({ name, about, avatar })
    .then((_user) => res.send({ data: _user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorArr = [];
        const _errors = Object.values(err.errors);
        _errors.forEach((key) => {
          errorArr.push(
            `Для поля ${key}: Ошибка валидации: ${err.errors[key]}`,
          );
        });
        res.status(INCORRECT_DATA_CODE).send({ message: errorArr[0] });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: SERVER_ERROR_TEXT });
      }
    });
};

module.exports.patchMe = (req, res) => {
  const { name, about } = req.body;
  const _id = req.user;

  user
    .findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((_user) => {
      if (_user) {
        res.send({ data: user });
      } else {
        res
          .status(INCORRECT_DATA_CODE)
          .send({ message: `${NO_ID_ERROR_TEXT} ${req.params.id}` });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorArr = [];
        const _errors = Object.values(err.errors);
        _errors.forEach((key) => {
          errorArr.push(
            `Для поля ${key}: Ошибка валидации: ${err.errors[key]}`,
          );
        });
        res.status(INCORRECT_DATA_CODE).send({ message: errorArr[0] });
      } else if (err.name === 'CastError') {
        res.status(NOT_FOUND_CODE).send({ message: INCORRECT_ID_ERROR_TEXT });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: SERVER_ERROR_TEXT });
      }
    });
};

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  const _id = req.user;

  user
    .findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((_user) => {
      if (_user) {
        res.send({ data: _user });
      } else {
        res
          .status(INCORRECT_DATA_CODE)
          .send({ message: `${NO_ID_ERROR_TEXT} ${req.params.id}` });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorArr = [];
        const _errors = Object.values(err.errors);
        _errors.forEach((key) => {
          errorArr.push(
            `Для поля ${key}: Ошибка валидации: ${err.errors[key]}`,
          );
        });
        res.status(INCORRECT_DATA_CODE).send({ message: errorArr[0] });
      } else if (err.name === 'CastError') {
        res.status(NOT_FOUND_CODE).send({ message: INCORRECT_ID_ERROR_TEXT });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: SERVER_ERROR_TEXT });
      }
    });
};
