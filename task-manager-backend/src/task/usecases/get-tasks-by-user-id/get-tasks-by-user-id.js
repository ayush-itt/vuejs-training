const taskMongo = require("../../mongo/task-mongo");

module.exports = {
    async execute(userId) {
        try {
            return await taskMongo.getTasksByUserId(userId);
        } catch (error) {
            throw error;
        }
    },
};
