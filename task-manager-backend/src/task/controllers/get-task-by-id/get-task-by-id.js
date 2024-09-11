const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const { getTaskByIdUsecase } = require("../../usecase");

const { TASK_FETCH_SUCCESS } = require("../../../commons/constants");

const getSingleTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;
    const response = await getTaskByIdUsecase.execute(id, userId);
    res.status(200).json(new ApiResponse(200, response, TASK_FETCH_SUCCESS));
});

module.exports = getSingleTask;
