const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const Services = require("../../usecase");

const { USER_DELETE_SUCCESS } = require("../../../commons/constants");

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const response = await Services.deleteUser.execute(id);
    res.status(204).json(new ApiResponse(204, response, USER_DELETE_SUCCESS));
});

module.exports = deleteUser;
