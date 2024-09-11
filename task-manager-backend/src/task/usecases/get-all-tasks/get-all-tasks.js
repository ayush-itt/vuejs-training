const mongo = require("../../mongo/task-mongo");

exports.execute = async (userId) => {
    try {
        const tasks = await mongo.getAllTasks(userId);
        return tasks;
    } catch (error) {
        throw error;
    }
};
