const {
  ERROR_404_CODE,
} = require('../utils/constants');

const card = require('../models/card');
const { errorHandler } = require('../middlewares/errorHandler');

module.exports.getCards = (_req, res) => {
  card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => errorHandler(res));
};

module.exports.deleteCard = (req, res, next) => {
  card
    .findOne({ _id: req.params.cardId })
    .then((data) => {
      if (data && data.owner === req.user) {
        card.findByIdAndRemove(req.params.cardId).then((delData) => {
          res.send({ delData });
        });
      } else if (data && data.owner !== req.user) {
        res
          .status(ERROR_404_CODE)
          .send({ message: 'Нельзя удалять карточку чужого пользователя' });
      } else {
        next(req.params.cardId);
      }
    })
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const _id = req.user;

  card
    .create({ name, link, owner: _id })
    .then((data) => res.send({ data }))
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((data) => {
      if (data) {
        res.send({ data });
      } else {
        next(req.params.cardId);
      }
    })
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((data) => {
      if (data) {
        res.send({ data });
      } else {
        next(req.params.cardId);
      }
    })
    .catch((err) => next(err));
};
