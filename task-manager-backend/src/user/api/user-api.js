const express = require("express");
const router = express.Router();
const {
    signupUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers");

const authMiddleware = require("../../middlewares/auth-middleware");
const unAuthMiddleware = require("../../middlewares/un-auth-middleware");
const isAdminMiddleware = require("../../middlewares/is-admin-middleware");

router.post("/signup", unAuthMiddleware, signupUser);
router.post("/login", unAuthMiddleware, loginUser);
router.get("/logout", authMiddleware, logoutUser);

router.get("/", authMiddleware, isAdminMiddleware, getAllUsers);

router.get("/profile", authMiddleware, getUserById);
router.patch("/profile", authMiddleware, updateUser);
router.delete("/profile", authMiddleware, deleteUser);

module.exports = router;
