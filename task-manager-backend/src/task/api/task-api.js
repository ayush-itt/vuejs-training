const express = require("express");
const router = express.Router();
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    deleteAllTasks,
} = require("../controllers");

const authorizeMiddleware = require("../../middlewares/authorize-middleware");

router.post(createTask.path, authorizeMiddleware, createTask.method);
router.get(getAllTasks.path, authorizeMiddleware, getAllTasks.method);
router.delete(deleteAllTasks.path, authorizeMiddleware, deleteAllTasks.method);

router.get(getTaskById.path, authorizeMiddleware, getTaskById.method);
router.patch(updateTask.path, authorizeMiddleware, updateTask.method);
router.delete(deleteTask.path, authorizeMiddleware, deleteTask.method);

module.exports = router;
