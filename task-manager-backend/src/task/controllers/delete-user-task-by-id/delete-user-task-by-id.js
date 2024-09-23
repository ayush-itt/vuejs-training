const ApiResponse = require("../../../utils/api-response");
const ApiError = require("../../../utils/api-error");
const { deleteUserTaskByIdUsecase } = require("../../usecases");
const { TASK_DELETE_SUCCESS } = require("../../../commons/constants");

module.exports = {
    deleteUserTaskById: {
        path: "/tasks/:taskId",
        reqType: "delete",
        method: async (req, res, next) => {
            try {
                const { taskId } = req.params;
                const userId = req.session.userId;
                await deleteUserTaskByIdUsecase.execute(taskId, userId);
                res.status(204).json(
                    new ApiResponse(204, true, TASK_DELETE_SUCCESS)
                );
            } catch (error) {
                next(new ApiError(400, error.message));
            }
        },
    },
};
