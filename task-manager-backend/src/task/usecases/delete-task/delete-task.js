const taskMongo = require("../../mongo/task-mongo");

module.exports = {
    async exports(taskId, userId) {
        try {
            await taskMongo.deleteTask(taskId, userId);
        } catch (error) {
            throw error;
        }
    },
};
