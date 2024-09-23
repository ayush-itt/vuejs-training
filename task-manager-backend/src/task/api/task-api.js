const express = require("express");
const router = express.Router();
const {
    createTask,
    getTasksByUserId,
    getUserTaskById,
    updateUserTaskById,
    deleteUserTaskById,
    deleteUserTasksById,
} = require("../controllers");

const authorizeMiddleware = require("../../middlewares/authorize-middleware");

router.post(createTask.path, authorizeMiddleware, createTask.method);
router.get(getTasksByUserId.path, authorizeMiddleware, getTasksByUserId.method);
router.delete(
    deleteUserTasksById.path,
    authorizeMiddleware,
    deleteUserTasksById.method
);

router.get(getUserTaskById.path, authorizeMiddleware, getUserTaskById.method);
router.patch(
    updateUserTaskById.path,
    authorizeMiddleware,
    updateUserTaskById.method
);
router.delete(
    deleteUserTaskById.path,
    authorizeMiddleware,
    deleteUserTaskById.method
);

module.exports = router;
