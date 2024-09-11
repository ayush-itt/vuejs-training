const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const { deleteTaskUsecase } = require("../../usecases");

const { TASK_DELETE_SUCCESS } = require("../../../commons/constants");

const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;
    await deleteTaskUsecase.execute(id, userId);
    res.status(204).json(new ApiResponse(204, true, TASK_DELETE_SUCCESS));
});

module.exports = deleteTask;
