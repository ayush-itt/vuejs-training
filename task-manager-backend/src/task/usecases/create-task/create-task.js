const mongo = require("../../mongo/task-mongo");

exports.execute = async (taskData) => {
    try {
        const task = await mongo.createTask(taskData);
        return task;
    } catch (error) {
        throw error;
    }
};
