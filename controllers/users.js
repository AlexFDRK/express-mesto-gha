const {
  INCORRECT_DATA_CODE,
  NOT_FOUND_CODE,
  DEFAULT_ERROR_CODE,
  SERVER_ERROR_TEXT,
  NO_ID_ERROR_TEXT,
  INCORRECT_ID_ERROR_TEXT,
  ERROR_404_CODE,
} = require('../utils/constants');

const { validate } = require('../utils/tools');

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
    .then((data) => {
      if (!data) {
        res.status(ERROR_404_CODE).send({
          message: `${NO_ID_ERROR_TEXT} ${req.params.id}`,
        });
      } else {
        res.send({ data });
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
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INCORRECT_DATA_CODE).send(validate(err));
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
    .then((data) => {
      if (data) {
        res.send({ data });
      } else {
        res
          .status(INCORRECT_DATA_CODE)
          .send({ message: `${NO_ID_ERROR_TEXT} ${req.params.id}` });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INCORRECT_DATA_CODE).send(validate(err));
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
    .then((data) => {
      if (data) {
        res.send({ data });
      } else {
        res
          .status(INCORRECT_DATA_CODE)
          .send({ message: `${NO_ID_ERROR_TEXT} ${req.params.id}` });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INCORRECT_DATA_CODE).send(validate(err));
      } else if (err.name === 'CastError') {
        res.status(NOT_FOUND_CODE).send({ message: INCORRECT_ID_ERROR_TEXT });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: SERVER_ERROR_TEXT });
      }
    });
};
