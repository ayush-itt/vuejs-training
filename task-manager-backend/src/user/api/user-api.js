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

const authorizeMiddleware = require("../../middlewares/authorize-middleware");
const unauthorizeMiddleware = require("../../middlewares/unauthorize-middleware");
const isAdminMiddleware = require("../../middlewares/is-admin-middleware");

router.post(signupUser.path, unauthorizeMiddleware, signupUser.method);
router.post(loginUser.path, unauthorizeMiddleware, loginUser.method);
router.get(logoutUser.path, authorizeMiddleware, logoutUser.method);

router.get(
    getAllUsers.path,
    authorizeMiddleware,
    isAdminMiddleware,
    getAllUsers.method
);

router.get(getUserById.path, authorizeMiddleware, getUserById.method);
router.patch(updateUser.path, authorizeMiddleware, updateUser.method);
router.delete(deleteUser.path, authorizeMiddleware, deleteUser.method);

module.exports = router;
