const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const Services = require("../../usecase");

const { PROFILE_FETCH_SUCCESS } = require("../../../commons/constants");

const getSingleUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const response = await Services.getSingleUser.execute(id);
    res.status(200).json(new ApiResponse(200, response, PROFILE_FETCH_SUCCESS));
});

module.exports = getSingleUser;
