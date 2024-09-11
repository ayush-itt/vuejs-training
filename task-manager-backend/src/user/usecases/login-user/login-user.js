const mongo = require("../../mongo/user-mongo");
const ApiError = require("../../../utils/api-error");
const removeExcludedFields = require("../../../utils/remove-excluded-fields");
const {
    LOGIN_FAILED,
    USER_EXCLUDED_FIELDS,
} = require("../../../commons/constants");

exports.execute = async (userData) => {
    try {
        const user = await mongo.getUserByUsername(userData.username);
        if (user.password !== userData.password) {
            throw new ApiError(401, LOGIN_FAILED);
        }
        const loggedUser = removeExcludedFields(
            user.toJSON(),
            USER_EXCLUDED_FIELDS
        );
        return loggedUser;
    } catch (error) {
        throw new ApiError(401, LOGIN_FAILED);
    }
};
