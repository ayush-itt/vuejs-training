const ApiResponse = require("../../../utils/api-response");
const ApiError = require("../../../utils/api-error");
const { createTaskUsecase } = require("../../usecases");
const { sendMailUsecase } = require("../../../mail/usecases");

const { TASK_CREATE_SUCCESS } = require("../../../commons/constants");

async function sendTaskAssignEmail(userId, adminId) {
    try {
        await sendMailUsecase.execute("task_assign_email", userId, adminId);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createTask: {
        path: "/",
        reqType: "post",
        method: async (req, res, next) => {
            try {
                const { title, dueDate, priority } = req.body;
                const userId = req.session.isAdmin
                    ? req.body.userId
                    : req.session.userId;
                const response = await createTaskUsecase.execute({
                    title,
                    dueDate,
                    priority,
                    userId,
                });

                if (
                    req.session.isAdmin &&
                    req.session.userId != req.body.userId
                )
                    await sendTaskAssignEmail(userId, req.session.userId);
                res.status(201).json(
                    new ApiResponse(201, response, TASK_CREATE_SUCCESS)
                );
            } catch (error) {
                next(new ApiError(400, error.message));
            }
        },
    },
};
