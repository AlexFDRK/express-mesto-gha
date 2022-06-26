const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  findUserById,
  patchMe,
  patchAvatar,
  getMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({ id: Joi.string().required().min(24).max(24) }),
  }),
  findUserById,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  patchMe,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(
        /(https?:\/\/)(w{3}\.)?(\w|-|_)*.[a-zA-Z]{2,3}(\w|\W)*/,
      ),
    }),
  }),
  patchAvatar,
);

module.exports = router;
