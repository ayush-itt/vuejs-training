const express = require("express");
const router = express.Router();
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    deletaAllTasks,
} = require("../controllers");

const authMiddleware = require("../../middlewares/auth-middleware");

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getAllTasks);
router.delete("/", authMiddleware, deletaAllTasks);

router.get("/:id", authMiddleware, getTaskById);
router.patch("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
