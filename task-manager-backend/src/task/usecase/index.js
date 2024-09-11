const createTaskUsecase = require("./create-task/create-task");
const getAllTasksUsecase = require("./get-all-tasks/get-all-tasks");
const getTaskByIdUsecase = require("./get-task-by-id/get-task-by-id");
const updateTaskUsecase = require("./update-task/update-task");
const deleteTaskUsecase = require("./delete-task/delete-task");
const deleteAllTasksUsecase = require("./delete-all-tasks/delete-all-tasks");

module.exports = {
    createTaskUsecase,
    getAllTasksUsecase,
    getTaskByIdUsecase,
    updateTaskUsecase,
    deleteTaskUsecase,
    deleteAllTasksUsecase,
};
