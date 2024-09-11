const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const { updateTaskUsecase } = require("../../usecase");

const { TASK_UPDATE_SUCCESS } = require("../../../commons/constants");

const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;
    const { title, dueDate, priority, status } = req.body;
    const response = await updateTaskUsecase.execute(id, userId, {
        title,
        dueDate,
        priority,
        status,
    });
    res.status(200).json(new ApiResponse(200, response, TASK_UPDATE_SUCCESS));
});

module.exports = updateTask;
