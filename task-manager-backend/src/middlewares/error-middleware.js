const ApiError = require("../utils/api-error");

const notFound = (req, res, next) => {
    next(new ApiError(404, `404 Not Found!! ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
    const { statusCode, message, success, errors } = err;
    res.status(statusCode || 500).json({
        statusCode: statusCode || 500,
        message,
        success,
        errors,
    });
};

module.exports = { notFound, errorHandler };
