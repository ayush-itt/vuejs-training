const mongo = require("../../mongo/task-mongo");

exports.execute = async (userId) => {
    try {
        await mongo.deleteAllTasks(userId);
        return true;
    } catch (error) {
        throw error;
    }
};
