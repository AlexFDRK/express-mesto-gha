const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(/(https?:\/\/)\w/),
    }),
  }),
  createCard
);

router.get('/', getCards);

router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().min(24).max(24),
    }),
  }),
  deleteCard
);

router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().min(24).max(24),
    }),
  }),
  likeCard
);

router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().min(24).max(24),
    }),
  }),
  dislikeCard
);

module.exports = router;
