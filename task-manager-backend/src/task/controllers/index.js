const { createTask } = require("./create-task/create-task");
const { getAllTasks } = require("./get-all-tasks/get-all-tasks");
const { getTaskById } = require("./get-task-by-id/get-task-by-id");
const { updateTask } = require("./update-task/update-task");
const { deleteTask } = require("./delete-task/delete-task");
const { deleteAllTasks } = require("./delete-all-tasks/delete-all-tasks");

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    deleteAllTasks,
};
