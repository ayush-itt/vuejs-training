const ApiResponse = require("../../../utils/api-response");
const ApiError = require("../../../utils/api-error");
const { deleteTaskUsecase } = require("../../usecases");

const { TASK_DELETE_SUCCESS } = require("../../../commons/constants");

module.exports = {
    deleteTask: {
        path: "/:id",
        reqType: "delete",
        method: async (req, res, next) => {
            try {
                const { id } = req.params;
                const userId = req.session.userId;
                await deleteTaskUsecase.execute(id, userId);
                res.status(204).json(
                    new ApiResponse(204, true, TASK_DELETE_SUCCESS)
                );
            } catch (error) {
                next(new ApiError(400, error.message));
            }
        },
    },
};
