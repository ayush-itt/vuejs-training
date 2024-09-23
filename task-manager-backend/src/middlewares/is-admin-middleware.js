const ApiError = require("../utils/api-error");
const { UNAUTHORIZED_REQUEST } = require("../commons/constants");

const isAdminMiddleware = (req, _, next) => {
    if (req.session?.isAdmin) {
        return next();
    }
    throw new ApiError(401, UNAUTHORIZED_REQUEST);
};

module.exports = isAdminMiddleware;
