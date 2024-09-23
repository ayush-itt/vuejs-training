const ApiResponse = require("../../../utils/api-response");
const ApiError = require("../../../utils/api-error");
const { updateUserTaskByIdUsecase } = require("../../usecases");
const { TASK_UPDATE_SUCCESS } = require("../../../commons/constants");

module.exports = {
    updateUserTaskById: {
        path: "/tasks/:taskId",
        reqType: "patch",
        method: async (req, res, next) => {
            try {
                const { taskId } = req.params;
                const userId = req.session.userId;
                const { title, dueDate, priority, status } = req.body;
                const response = await updateUserTaskByIdUsecase.execute(
                    taskId,
                    userId,
                    {
                        title,
                        dueDate,
                        priority,
                        status,
                    }
                );
                res.status(201).json(
                    new ApiResponse(201, response, TASK_UPDATE_SUCCESS)
                );
            } catch (error) {
                next(new ApiError(400, error.message));
            }
        },
    },
};
