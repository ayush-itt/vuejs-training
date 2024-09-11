const asyncHandler = require("../utils/async-handler");
const ApiError = require("../utils/api-error");

const { UNAUTHORIZED_REQUEST } = require("../commons/constants");

const authMiddleware = asyncHandler(async (req, _, next) => {
    if (req.session && req.session?.auth && req.session?.userId) {
        next();
    } else {
        throw new ApiError(404, UNAUTHORIZED_REQUEST);
    }
});

module.exports = authMiddleware;
