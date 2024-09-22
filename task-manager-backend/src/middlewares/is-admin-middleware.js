const ApiError = require("../utils/api-error");

const { UNAUTHORIZED_REQUEST } = require("../commons/constants");

const isAdminMiddleware = (req, _, next) => {
    if (req.session?.isAdmin) {
        next();
    } else {
        throw new ApiError(401, UNAUTHORIZED_REQUEST);
    }
};

module.exports = isAdminMiddleware;
