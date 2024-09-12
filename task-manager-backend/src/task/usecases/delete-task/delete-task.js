const taskMongo = require("../../mongo/task-mongo");

exports.execute = async (taskId, userId) => {
    try {
        await taskMongo.deleteTask(taskId, userId);
        return true;
    } catch (error) {
        throw error;
    }
};
