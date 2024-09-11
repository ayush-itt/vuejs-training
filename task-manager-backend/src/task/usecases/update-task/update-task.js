const mongo = require("../../mongo/task-mongo");

exports.execute = async (taskId, userId, data) => {
    try {
        const updatedTask = await mongo.updateTask(taskId, userId, data);
        return updatedTask;
    } catch (error) {
        throw error;
    }
};
