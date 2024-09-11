const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const { getAllUserUsecase } = require("../../usecases");

const { PROFILE_FETCH_SUCCESS } = require("../../../commons/constants");

const getAllUser = asyncHandler(async (req, res) => {
    const response = await getAllUserUsecase.execute();
    res.status(200).json(new ApiResponse(200, response, PROFILE_FETCH_SUCCESS));
});

module.exports = getAllUser;
