const taskMongo = require("../../mongo/task-mongo");

exports.execute = async (userId) => {
    try {
        const tasks = await taskMongo.getAllTasks(userId);
        return tasks;
    } catch (error) {
        throw error;
    }
};
