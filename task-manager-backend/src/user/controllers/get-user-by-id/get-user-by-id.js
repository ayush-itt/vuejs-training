const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const { getUserByIdUsecase } = require("../../usecases");

const { PROFILE_FETCH_SUCCESS } = require("../../../commons/constants");

module.exports = {
    getUserById: {
        path: "/profile",
        reqType: "get",
        method: asyncHandler(async (req, res) => {
            const userId = req.session.userId;
            const response = await getUserByIdUsecase.execute(userId);
            res.status(200).json(
                new ApiResponse(200, response, PROFILE_FETCH_SUCCESS)
            );
        }),
    },
};
