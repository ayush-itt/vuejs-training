const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "get all tasks" });
});

router.get("/:id", (req, res) => {
    res.json({ message: `get task with id ${req.params.id}` });
});

router.post("/", (req, res) => {
    res.json({ message: "create task" });
});

router.patch("/:id", (req, res) => {
    res.json({ message: `update task with id ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
    res.json({ message: `delete task with id ${req.params.id}` });
});

module.exports = router;
