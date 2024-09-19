const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const { updateTaskUsecase } = require("../../usecases");

const { TASK_UPDATE_SUCCESS } = require("../../../commons/constants");

module.exports = {
    updateTask: {
        path: "/:id",
        reqType: "patch",
        method: asyncHandler(async (req, res) => {
            const { id } = req.params;
            const userId = req.session.userId;
            const { title, dueDate, priority, status } = req.body;
            const response = await updateTaskUsecase.execute(id, userId, {
                title,
                dueDate,
                priority,
                status,
            });
            res.status(201).json(
                new ApiResponse(201, response, TASK_UPDATE_SUCCESS)
            );
        }),
    },
};
