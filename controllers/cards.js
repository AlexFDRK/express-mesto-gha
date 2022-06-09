const INCORRECT_DATA_CODE = 400;
const NOT_FOUND_CODE = 404;
const DEFAULT_ERROR_CODE = 500;

const Card = require("../models/card");

module.exports.getCards = (_req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      res.send({ data: card });
      // if (card) {
      //   res.send({ data: card });
      // } else {
      //   res.status(INCORRECT_DATA_CODE).send({ message: err.message });
      // }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(INCORRECT_DATA_CODE)
          .send({ message: "Запрашиваемая карточка не найдена" });
      } else if (err.name === "ReferenceError") {
        res
          .status(NOT_FOUND_CODE)
          .send({ message: "Запрашиваемая карточка не найдена" });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link, likes, createdAt } = req.body;
  const _id = req.user;

  Card.create({ name, link, owner: _id, likes, createdAt })
    .then((card) => res.send({ data: card }))
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
        res.status(INCORRECT_DATA_CODE).send({ message: err.message });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(INCORRECT_DATA_CODE)
          .send({ message: "Запрашиваемая карточка не найдена" });
      } else if (err.name === "ReferenceError") {
        res
          .status(NOT_FOUND_CODE)
          .send({ message: "Запрашиваемая карточка не найдена" });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
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
        res.status(INCORRECT_DATA_CODE).send({ message: err.message });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(INCORRECT_DATA_CODE)
          .send({ message: "Запрашиваемая карточка не найдена" });
      } else if (err.name === "ReferenceError") {
        res
          .status(NOT_FOUND_CODE)
          .send({ message: "Запрашиваемая карточка не найдена" });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
      }
    });
};
