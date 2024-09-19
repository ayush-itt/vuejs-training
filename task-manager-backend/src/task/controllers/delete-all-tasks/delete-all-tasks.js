const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const { deleteAllTasksUsecase } = require("../../usecases");

const { TASK_DELETE_SUCCESS } = require("../../../commons/constants");

module.exports = {
    deleteAllTasks: {
        path: "/",
        reqType: "delete",
        method: asyncHandler(async (req, res) => {
            const userId = req.session.userId;
            await deleteAllTasksUsecase.execute(userId);
            res.status(204).json(
                new ApiResponse(204, true, TASK_DELETE_SUCCESS)
            );
        }),
    },
};
