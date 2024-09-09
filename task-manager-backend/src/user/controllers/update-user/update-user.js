const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const Services = require("../../usecase");

const { USER_UPDATE_SUCCESS } = require("../../../commons/constants");

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { username, email, password, image } = req.body;
    const response = await Services.updateUser.execute({
        id,
        username,
        email,
        password,
        image,
    });
    res.status(201).json(new ApiResponse(201, response, USER_UPDATE_SUCCESS));
});

module.exports = updateUser;
