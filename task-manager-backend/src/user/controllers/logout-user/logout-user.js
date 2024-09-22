const ApiResponse = require("../../../utils/api-response");
const ApiError = require("../../../utils/api-error");
const { LOGOUT_SUCCESS, LOGOUT_FAILED } = require("../../../commons/constants");

module.exports = {
    logoutUser: {
        path: "/logout",
        reqType: "get",
        method: async (req, res, next) => {
            try {
                req.session.destroy(function (err) {
                    if (err) throw new Error(LOGOUT_FAILED);
                });

                res.status(200).json(new ApiResponse(200, {}, LOGOUT_SUCCESS));
            } catch (error) {
                next(new ApiError(400, error.message));
            }
        },
    },
};
