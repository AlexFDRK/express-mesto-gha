const router = require('express').Router();
const {
  getUsers,
  findUserById,
  patchMe,
  patchAvatar,
  getMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:id', findUserById);
router.patch('/patchMe', patchMe);
router.patch('/me/avatar', patchAvatar);

module.exports = router;
