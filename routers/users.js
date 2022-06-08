const router = require("express").Router();
const {
  getUsers,
  findUserById,
  createUser,
  patchMe,
  patchAvatar,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:id", findUserById);
router.post("/", createUser);
router.patch("/me", patchMe);
router.patch("/me/avatar", patchAvatar);

module.exports = router;
