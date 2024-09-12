const userMongo = require("../../mongo/user-mongo");
const { deleteAllTasksUsecase } = require("../../../task/usecases");
exports.execute = async (id) => {
    try {
        await deleteAllTasksUsecase.execute(id);
        await userMongo.deleteUser(id);
        return true;
    } catch (error) {
        throw error;
    }
};
