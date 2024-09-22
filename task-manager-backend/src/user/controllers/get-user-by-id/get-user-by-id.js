const ApiResponse = require("../../../utils/api-response");
const ApiError = require("../../../utils/api-error");
const { getUserByIdUsecase } = require("../../usecases");

const { PROFILE_FETCH_SUCCESS } = require("../../../commons/constants");

module.exports = {
    getUserById: {
        path: "/profile",
        reqType: "get",
        method: async (req, res, next) => {
            try {
                const userId = req.session.userId;
                const response = await getUserByIdUsecase.execute(userId);
                res.status(200).json(
                    new ApiResponse(200, response, PROFILE_FETCH_SUCCESS)
                );
            } catch (error) {
                next(new ApiError(400, error.message));
            }
        },
    },
};
