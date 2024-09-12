const taskMongo = require("../../mongo/task-mongo");

exports.execute = async (taskId, userId, data) => {
    try {
        const updatedTask = await taskMongo.updateTask(taskId, userId, data);
        return updatedTask;
    } catch (error) {
        throw error;
    }
};
