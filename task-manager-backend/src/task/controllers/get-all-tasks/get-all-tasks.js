const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const { getAllTasksUsecase } = require("../../usecase");

const { TASK_FETCH_SUCCESS } = require("../../../commons/constants");

const getAllTasks = asyncHandler(async (req, res) => {
    const userId = req.session.userId;
    const response = await getAllTasksUsecase.execute(userId);
    res.status(200).json(new ApiResponse(200, response, TASK_FETCH_SUCCESS));
});

module.exports = getAllTasks;
