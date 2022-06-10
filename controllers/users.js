const INCORRECT_DATA_CODE = 400;
const NOT_FOUND_CODE = 404;
const DEFAULT_ERROR_CODE = 500;

const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) =>
      res.status(DEFAULT_ERROR_CODE).send({ message: err.message })
    );
};

module.exports.findUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res
          .status(NOT_FOUND_CODE)
          .send({ message: "Запрошен пользователь с несуществующим в БД id" });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(INCORRECT_DATA_CODE)
          .send({ message: "Запрошен пользователь с некорректным id" });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(INCORRECT_DATA_CODE)
          .send({ message: "Не заполнены обязательные поля" });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
      }
    });
};

module.exports.patchMe = (req, res) => {
  const { name, about } = req.body;
  const _id = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(INCORRECT_DATA_CODE)
          .send({ message: "Не заполнены обязательные поля" });
      } else if (err.name === "CastError") {
        res
          .status(NOT_FOUND_CODE)
          .send({ message: "Запрошен пользователь с некорректным id" });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
      }
    });
};

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  const _id = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(INCORRECT_DATA_CODE)
          .send({ message: "Не заполнены обязательные поля" });
      } else if (err.name === "CastError") {
        res
          .status(NOT_FOUND_CODE)
          .send({ message: "Запрошен пользователь с некорректным id" });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
      }
    });
};
