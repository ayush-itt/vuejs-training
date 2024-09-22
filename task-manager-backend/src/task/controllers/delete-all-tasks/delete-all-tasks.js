const ApiResponse = require("../../../utils/api-response");
const ApiError = require("../../../utils/api-error");
const { deleteAllTasksUsecase } = require("../../usecases");

const { TASK_DELETE_SUCCESS } = require("../../../commons/constants");

module.exports = {
    deleteAllTasks: {
        path: "/",
        reqType: "delete",
        method: async (req, res, next) => {
            try {
                const userId = req.session.userId;
                await deleteAllTasksUsecase.execute(userId);
                res.status(204).json(
                    new ApiResponse(204, true, TASK_DELETE_SUCCESS)
                );
            } catch (error) {
                next(new ApiError(400, error.message));
            }
        },
    },
};
