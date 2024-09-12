const userMongo = require("../../mongo/user-mongo");
const { deleteAllTasksUsecase } = require("../../../task/usecases");
const { deleteUserMailLogsUsecase } = require("../../../mail/usecases");
exports.execute = async (id) => {
    try {
        await deleteAllTasksUsecase.execute(id);
        await deleteUserMailLogsUsecase.execute(id);
        await userMongo.deleteUser(id);
        return true;
    } catch (error) {
        throw error;
    }
};
