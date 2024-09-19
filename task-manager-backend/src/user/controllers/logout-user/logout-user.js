const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const ApiError = require("../../../utils/api-error");
const { LOGOUT_SUCCESS, LOGOUT_FAILED } = require("../../../commons/constants");

module.exports = {
    logoutUser: {
        path: "/logout",
        reqType: "get",
        method: asyncHandler(async (req, res) => {
            req.session.destroy(function (err) {
                if (err) throw new ApiError(401, LOGOUT_FAILED);
            });

            res.status(200).json(new ApiResponse(200, {}, LOGOUT_SUCCESS));
        }),
    },
};
