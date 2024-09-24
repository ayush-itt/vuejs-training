const createTaskUsecase = require("./create-task/create-task");
const getTasksByUserIdUsecase = require("./get-tasks-by-user-id/get-tasks-by-user-id");
const getUserTaskByIdUsecase = require("./get-user-task-by-id/get-user-task-by-id");
const updateUserTaskByIdUsecase = require("./update-user-task-by-id/update-user-task-by-id");
const deleteUserTaskByIdUsecase = require("./delete-user-task-by-id/delete-user-task-by-id");
const deleteUserTasksByIdUsecase = require("./delete-user-tasks-by-id/delete-user-tasks-by-id");

module.exports = {
    createTaskUsecase,
    getTasksByUserIdUsecase,
    getUserTaskByIdUsecase,
    updateUserTaskByIdUsecase,
    deleteUserTaskByIdUsecase,
    deleteUserTasksByIdUsecase,
};
