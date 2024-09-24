const { createTask } = require("./create-task/create-task");
const {
    getTasksByUserId,
} = require("./get-tasks-by-user-id/get-tasks-by-user-id");
const {
    getUserTaskById,
} = require("./get-user-task-by-id/get-user-task-by-id");
const {
    updateUserTaskById,
} = require("./update-user-task-by-id/update-user-task-by-id");
const {
    deleteUserTaskById,
} = require("./delete-user-task-by-id/delete-user-task-by-id");
const {
    deleteUserTasksById,
} = require("./delete-user-tasks-by-id/delete-user-tasks-by-id");

module.exports = {
    createTask,
    getTasksByUserId,
    getUserTaskById,
    updateUserTaskById,
    deleteUserTaskById,
    deleteUserTasksById,
};
