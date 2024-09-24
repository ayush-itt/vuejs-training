const ApiError = require("../utils/api-error");
const { UNAUTHORIZED_REQUEST } = require("../commons/constants");

const authorizeMiddleware = (req, _, next) => {
    if (req.session && req.session?.auth && req.session?.userId) {
        return next();
    }
    throw new ApiError(401, UNAUTHORIZED_REQUEST);
};

module.exports = authorizeMiddleware;
