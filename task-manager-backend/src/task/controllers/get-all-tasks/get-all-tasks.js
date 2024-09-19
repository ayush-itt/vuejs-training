const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const { getAllTasksUsecase } = require("../../usecases");

const { TASK_FETCH_SUCCESS } = require("../../../commons/constants");

module.exports = {
    getAllTasks: {
        path: "/",
        reqType: "get",
        method: asyncHandler(async (req, res) => {
            const userId = req.session.userId;
            const response = await getAllTasksUsecase.execute(userId);
            res.status(200).json(
                new ApiResponse(200, response, TASK_FETCH_SUCCESS)
            );
        }),
    },
};
