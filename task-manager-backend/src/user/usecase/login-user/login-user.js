const mongo = require("../../mongo/user-mongo");
const ApiError = require("../../../utils/api-error");
const { LOGIN_FAILED } = require("../../../commons/constants");
exports.execute = async (userData) => {
    try {
        const user = await mongo.getUserByUsername(userData.username);
        if (user.password !== userData.password) {
            throw new ApiError(401, LOGIN_FAILED);
        }
        return user;
    } catch (error) {
        throw new ApiError(401, LOGIN_FAILED);
    }
};
