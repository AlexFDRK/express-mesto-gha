const {
  INCORRECT_DATA_CODE,
  NOT_FOUND_CODE,
  DEFAULT_ERROR_CODE,
  SERVER_ERROR_TEXT,
  NO_ID_ERROR_TEXT,
  INCORRECT_ID_ERROR_TEXT,
} = require("../constants/constants");

const Card = require("../models/card");

module.exports.getCards = (_req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: SERVER_ERROR_TEXT }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(NOT_FOUND_CODE).send({
          message: NO_ID_ERROR_TEXT + req.params.cardId,
        });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(INCORRECT_DATA_CODE)
          .send({ message: INCORRECT_ID_ERROR_TEXT });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: SERVER_ERROR_TEXT });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const _id = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const errorArr = [];
        for (var key in err.errors) {
          errorArr.push(
            `Для поля ${key}: Ошибка валидации: ${err.errors[key]}`
          );
        }
        res.status(INCORRECT_DATA_CODE).send({ message: errorArr[0] });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: SERVER_ERROR_TEXT });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res
          .status(NOT_FOUND_CODE)
          .send({ message: NO_ID_ERROR_TEXT + req.params.cardId });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(INCORRECT_DATA_CODE)
          .send({ message: INCORRECT_ID_ERROR_TEXT });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: SERVER_ERROR_TEXT });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res
          .status(NOT_FOUND_CODE)
          .send({ message: NO_ID_ERROR_TEXT + req.params.cardId });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(INCORRECT_DATA_CODE)
          .send({ message: INCORRECT_ID_ERROR_TEXT });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: SERVER_ERROR_TEXT });
      }
    });
};