const ApiError = require("../utils/api-error");
const { LOGGED_IN_ALREADY } = require("../commons/constants");

const unauthorizeMiddleware = (req, _, next) => {
    if (req.session && !req.session.auth) {
        return next();
    }
    throw new ApiError(403, LOGGED_IN_ALREADY);
};

module.exports = unauthorizeMiddleware;
