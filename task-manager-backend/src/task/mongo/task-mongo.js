const ApiError = require("../../utils/api-error");
const Task = require("./task-model");

const {
    TASK_CREATE_FAILED,
    TASK_FETCH_FAILED,
    TASK_UPDATE_FAILED,
    TASK_DELETE_FAILED,
} = require("../../commons/constants");

const createTask = async (data) => {
    try {
        const task = await Task.create(data);
        return task;
    } catch (error) {
        throw new ApiError(401, TASK_CREATE_FAILED);
    }
};

const getAllTasks = async (userId) => {
    try {
        const tasks = await Task.find({ userId });
        return tasks;
    } catch (error) {
        throw new ApiError(401, TASK_FETCH_FAILED);
    }
};

const getTaskById = async (taskId, userId) => {
    try {
        const task = await Task.findOne({ _id: taskId, userId });
        if (!task) throw new Error();
        return task;
    } catch (error) {
        throw new ApiError(401, TASK_FETCH_FAILED);
    }
};

const updateTask = async (taskId, userId, data) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, userId },
            data,
            { new: true }
        );
        return updatedTask;
    } catch (error) {
        throw new ApiError(401, TASK_UPDATE_FAILED);
    }
};

const deleteTask = async (taskId, userId) => {
    try {
        await Task.findOneAndDelete({ _id: taskId, userId });
        return true;
    } catch (error) {
        throw new ApiError(401, TASK_DELETE_FAILED);
    }
};

const deleteAllTasks = async (userId) => {
    try {
        await Task.deleteMany({ userId });
        return true;
    } catch (error) {
        throw new ApiError(401, TASK_DELETE_FAILED);
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    deleteAllTasks,
};
