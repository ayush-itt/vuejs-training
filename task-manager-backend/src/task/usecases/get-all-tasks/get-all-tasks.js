const taskMongo = require("../../mongo/task-mongo");

module.exports = {
    async execute(userId) {
        try {
            return await taskMongo.getAllTasks(userId);
        } catch (error) {
            throw error;
        }
    },
};
