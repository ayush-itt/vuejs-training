const userMongo = require("../../mongo/user-mongo");
const { deleteAllTasksUsecase } = require("../../../task/usecases");
const { deleteUserMailLogsUsecase } = require("../../../mail/usecases");

module.exports = {
    async execute(id) {
        try {
            await deleteAllTasksUsecase.execute(id);
            await deleteUserMailLogsUsecase.execute(id);
            await userMongo.deleteUserById(id);
        } catch (error) {
            throw error;
        }
    },
};
