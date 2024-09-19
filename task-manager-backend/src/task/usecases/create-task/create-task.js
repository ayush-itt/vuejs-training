const taskMongo = require("../../mongo/task-mongo");

module.exports = {
    async execute(taskData) {
        try {
            return await taskMongo.createTask(taskData);
        } catch (error) {
            throw error;
        }
    },
};
