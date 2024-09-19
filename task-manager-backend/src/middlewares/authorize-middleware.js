const asyncHandler = require("../utils/async-handler");
const ApiError = require("../utils/api-error");

const { UNAUTHORIZED_REQUEST } = require("../commons/constants");

const authorizeMiddleware = asyncHandler(async (req, _, next) => {
    if (req.session && req.session?.auth && req.session?.userId) {
        next();
    } else {
        throw new ApiError(401, UNAUTHORIZED_REQUEST);
    }
});

module.exports = authorizeMiddleware;
