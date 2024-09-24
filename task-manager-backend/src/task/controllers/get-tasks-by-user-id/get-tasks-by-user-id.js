const ApiResponse = require("../../../utils/api-response");
const ApiError = require("../../../utils/api-error");
const { getTasksByUserIdUsecase } = require("../../usecases");
const { TASK_FETCH_SUCCESS } = require("../../../commons/constants");

module.exports = {
    getTasksByUserId: {
        path: "/tasks",
        reqType: "get",
        method: async (req, res, next) => {
            try {
                const userId = req.session.userId;
                const response = await getTasksByUserIdUsecase.execute(userId);
                res.status(200).json(
                    new ApiResponse(200, response, TASK_FETCH_SUCCESS)
                );
            } catch (error) {
                next(new ApiError(400, error.message));
            }
        },
    },
};
