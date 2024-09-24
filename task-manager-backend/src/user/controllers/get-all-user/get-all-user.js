const ApiResponse = require("../../../utils/api-response");
const ApiError = require("../../../utils/api-error");
const { getAllUserUsecase } = require("../../usecases");
const { PROFILE_FETCH_SUCCESS } = require("../../../commons/constants");

module.exports = {
    getAllUsers: {
        path: "/users",
        reqType: "get",
        method: async (req, res, next) => {
            try {
                const response = await getAllUserUsecase.execute();
                res.status(200).json(
                    new ApiResponse(200, response, PROFILE_FETCH_SUCCESS)
                );
            } catch (error) {
                next(new ApiError(400, error.message));
            }
        },
    },
};
