const taskMongo = require("../../mongo/task-mongo");

module.exports = {
    async execute(taskId, userId) {
        try {
            return await taskMongo.getTaskById(taskId, userId);
        } catch (error) {
            throw error;
        }
    },
};
