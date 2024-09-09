const express = require("express");
const router = express.Router();
const {
    signupUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers");

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.get("/", getAllUsers);

router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
