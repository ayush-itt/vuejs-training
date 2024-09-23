const ApiResponse = require("../../../utils/api-response");
const ApiError = require("../../../utils/api-error");
const { deleteUserTasksByIdUsecase } = require("../../usecases");
const { TASK_DELETE_SUCCESS } = require("../../../commons/constants");

module.exports = {
    deleteUserTasksById: {
        path: "/tasks",
        reqType: "delete",
        method: async (req, res, next) => {
            try {
                await deleteUserTasksByIdUsecase.execute(req.session.userId);
                res.status(204).json(
                    new ApiResponse(204, true, TASK_DELETE_SUCCESS)
                );
            } catch (error) {
                next(new ApiError(400, error.message));
            }
        },
    },
};
