const taskMongo = require("../../mongo/task-mongo");

exports.execute = async (taskData) => {
    try {
        const task = await taskMongo.createTask(taskData);
        return task;
    } catch (error) {
        throw error;
    }
};
