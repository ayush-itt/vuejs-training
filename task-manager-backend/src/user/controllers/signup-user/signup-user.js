const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const { signupUserUsecase } = require("../../usecases");

const { CREATE_SUCCESS } = require("../../../commons/constants");

const signupUser = asyncHandler(async (req, res) => {
    const { username, email, password, image, isAdmin } = req.body;
    const response = await signupUserUsecase.execute({
        username,
        email,
        password,
        image,
        isAdmin,
    });
    res.status(201).json(new ApiResponse(201, response, CREATE_SUCCESS));
});

module.exports = signupUser;
