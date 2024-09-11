const mongo = require("../../mongo/task-mongo");

exports.execute = async (taskId, userId) => {
    try {
        await mongo.deleteTask(taskId, userId);
        return true;
    } catch (error) {
        throw error;
    }
};
