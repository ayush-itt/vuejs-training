const taskMongo = require("../../mongo/task-mongo");

module.exports = {
    async execute(userId) {
        try {
            await taskMongo.deleteAllTasks(userId);
        } catch (error) {
            throw error;
        }
    },
};
