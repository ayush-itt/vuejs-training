const userMongo = require("../../mongo/user-mongo");
const { deleteAllTasksUsecase } = require("../../../task/usecases");
const { deleteUserMailLogsUsecase } = require("../../../mail/usecases");

async function deleteUserTasksAndMailLogs(id) {
    try {
        await deleteAllTasksUsecase.execute(id);
        await deleteUserMailLogsUsecase.execute(id);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    async execute(id) {
        try {
            await deleteUserTasksAndMailLogs(id);
            await userMongo.deleteUser(id);
        } catch (error) {
            throw error;
        }
    },
};
