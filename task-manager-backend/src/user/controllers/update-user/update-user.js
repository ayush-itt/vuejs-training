const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const { updateUserUsecase } = require("../../usecases");

const { USER_UPDATE_SUCCESS } = require("../../../commons/constants");

const updateUser = asyncHandler(async (req, res) => {
    const userId = req.session.userId;
    const { username, email, password, image } = req.body;
    const response = await updateUserUsecase.execute(userId, {
        username,
        email,
        password,
        image,
    });
    res.status(201).json(new ApiResponse(201, response, USER_UPDATE_SUCCESS));
});

module.exports = updateUser;
