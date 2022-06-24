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
  celebrate({ body: Joi.object().keys({ id: Joi.string().min(24).max(24) }) }),
  findUserById,
);
router.patch('/patchMe', patchMe);
router.patch('/me/avatar', patchAvatar);

module.exports = router;
