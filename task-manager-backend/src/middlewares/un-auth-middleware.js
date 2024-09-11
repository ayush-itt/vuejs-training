const asyncHandler = require("../utils/async-handler");
const ApiError = require("../utils/api-error");

const { LOGGED_IN_ALREADY } = require("../commons/constants");

const authMiddleware = asyncHandler(async (req, _, next) => {
    if (req.session && !req.session.auth) {
        next();
    } else {
        throw new ApiError(403, LOGGED_IN_ALREADY);
    }
});

module.exports = authMiddleware;
