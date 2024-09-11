const mongo = require("../../mongo/task-mongo");

exports.execute = async (taskId, userId) => {
    try {
        const task = await mongo.getTaskById(taskId, userId);
        return task;
    } catch (error) {
        throw error;
    }
};
