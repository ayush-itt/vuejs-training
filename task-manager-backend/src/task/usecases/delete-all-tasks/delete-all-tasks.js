const taskMongo = require("../../mongo/task-mongo");

exports.execute = async (userId) => {
    try {
        await taskMongo.deleteAllTasks(userId);
        return true;
    } catch (error) {
        throw error;
    }
};
