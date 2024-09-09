const mongo = require("../../mongo/user-mongo");
const ApiError = require("../../../utils/api-error");
const { CREATE_FAILED } = require("../../../commons/constants");

exports.execute = async (userData) => {
    try {
        const user = await mongo.getUserByUsername(userData.username);
        if (user) {
            throw new ApiError(401, CREATE_FAILED);
        }
        const newUser = await mongo.createUser(userData);
        return newUser;
    } catch (error) {
        throw error;
    }
};
