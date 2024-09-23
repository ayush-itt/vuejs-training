const ApiResponse = require("../../../utils/api-response");
const ApiError = require("../../../utils/api-error");
const { getUserTaskByIdUsecase } = require("../../usecases");
const { TASK_FETCH_SUCCESS } = require("../../../commons/constants");

module.exports = {
    getUserTaskById: {
        path: "/tasks/:taskId",
        reqType: "get",
        method: async (req, res, next) => {
            try {
                const { taskId } = req.params;
                const userId = req.session.userId;
                const response = await getUserTaskByIdUsecase.execute(
                    taskId,
                    userId
                );
                res.status(200).json(
                    new ApiResponse(200, response, TASK_FETCH_SUCCESS)
                );
            } catch (error) {
                next(new ApiError(400, error.message));
            }
        },
    },
};
