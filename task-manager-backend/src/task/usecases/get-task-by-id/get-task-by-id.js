const taskMongo = require("../../mongo/task-mongo");

exports.execute = async (taskId, userId) => {
    try {
        const task = await taskMongo.getTaskById(taskId, userId);
        return task;
    } catch (error) {
        throw error;
    }
};
