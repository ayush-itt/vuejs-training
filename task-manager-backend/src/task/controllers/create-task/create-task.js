const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const { createTaskUsecase } = require("../../usecases");

const { TASK_CREATE_SUCCESS } = require("../../../commons/constants");

const createTask = asyncHandler(async (req, res) => {
    const { title, dueDate, priority } = req.body;
    const userId = req.session.isAdmin ? req.body.userId : req.session.userId;

    const response = await createTaskUsecase.execute({
        title,
        dueDate,
        priority,
        userId,
    });
    res.status(201).json(new ApiResponse(201, response, TASK_CREATE_SUCCESS));
});

module.exports = createTask;
