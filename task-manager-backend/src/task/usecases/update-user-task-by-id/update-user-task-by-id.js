const taskMongo = require("../../mongo/task-mongo");

module.exports = {
    async execute(taskId, userId, data) {
        try {
            return await taskMongo.updateUserTaskById(taskId, userId, data);
        } catch (error) {
            throw error;
        }
    },
};
