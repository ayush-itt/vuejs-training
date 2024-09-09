const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const Services = require("../../usecase");

const { LOGIN_SUCCESS } = require("../../../commons/constants");

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const response = await Services.loginUser.execute({ username, password });
    res.status(200).json(new ApiResponse(200, response, LOGIN_SUCCESS));
});

module.exports = loginUser;
