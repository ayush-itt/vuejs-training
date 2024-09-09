const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const Services = require("../../usecase");

const { CREATE_SUCCESS } = require("../../../commons/constants");

const signupUser = asyncHandler(async (req, res) => {
    const { username, email, password, image } = req.body;
    const response = await Services.signupUser.execute({
        username,
        email,
        password,
        image,
    });
    res.status(201).json(new ApiResponse(201, response, CREATE_SUCCESS));
});

module.exports = signupUser;
