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
  celebrate({ params: Joi.object().keys({ id: Joi.string().required().min(24).max(24) }) }),
  findUserById,
);
router.patch('/me', patchMe);
router.patch('/me/avatar', patchAvatar);

module.exports = router;
