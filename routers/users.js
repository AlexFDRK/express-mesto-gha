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
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  findUserById
);
router.patch('/me', patchMe);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(
        /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/
      ),
    }),
  }),
  patchAvatar
);

module.exports = router;
