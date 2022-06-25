const card = require('../models/card');
const СustomError = require('../utils/customError');

module.exports.getCards = (_req, res, next) => {
  card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => next(new СustomError()));
};

module.exports.deleteCard = (req, res, next) => {
  card
    .findOne({ _id: req.params.cardId })
    .then((data) => {
      if (data && data.owner.toString() === req.user._id) {
        card.findByIdAndRemove(req.params.cardId).then((delData) => {
          res.send({ delData });
        });
      } else if (data && data.owner.toString() !== req.user._id) {
        next(
          new СustomError('Нельзя удалять карточку чужого пользователя', 404)
        );
      } else {
        next(new СustomError(`Попытка удаления данных с несуществующим id ${req.params.cardId}`, 404));
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
      { new: true }
    )
    .then((data) => {
      if (data) {
        res.send({ data });
      } else {
        next(new СustomError(req.params.cardId, 404));
      }
    })
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .then((data) => {
      if (data) {
        res.send({ data });
      } else {
        next(new СustomError(req.params.cardId, 404));
      }
    })
    .catch((err) => next(err));
};
