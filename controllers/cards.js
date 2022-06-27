const Card = require('../models/card');
const СustomError = require('../utils/customError');
const {
  MISSING_ID_ERROR_TEXT,
  NOT_OWNER_ERROR_TEXT,
  DATA_NOT_FOUND_TEXT,
  ERROR_403,
  ERROR_404,
} = require('../utils/constants');

module.exports.getCards = (_req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .then((data) => {
      if (data && data.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId).then((delData) => {
          res.send({ delData });
        });
      } else if (data && data.owner.toString() !== req.user._id) {
        next(new СustomError(NOT_OWNER_ERROR_TEXT, ERROR_403));
      } else {
        next(new СustomError(DATA_NOT_FOUND_TEXT, ERROR_404));
      }
    })
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const _id = req.user;

  Card.create({ name, link, owner: _id })
    .then((data) => res.status(201).send({ data }))
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (data) {
        res.send({ data });
      } else {
        next(new СustomError(MISSING_ID_ERROR_TEXT, ERROR_404));
      }
    })
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (data) {
        res.send({ data });
      } else {
        next(new СustomError(MISSING_ID_ERROR_TEXT, ERROR_404));
      }
    })
    .catch((err) => next(err));
};
