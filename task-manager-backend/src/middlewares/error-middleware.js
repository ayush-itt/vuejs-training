const ApiError = require("../utils/api-error");

const notFound = (req, res, next) => {
    next(new ApiError(404, `404 Not Found!! ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
    const { statusCode, message, success, errors } = err;
    const status_code = statusCode ? err.statusCode : 500;
    res.status(status_code).json({
        statusCode,
        message,
        success,
        errors,
    });
};

module.exports = { notFound, errorHandler };
