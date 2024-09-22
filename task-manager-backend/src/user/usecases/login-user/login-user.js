const userMongo = require("../../mongo/user-mongo");
const removeExcludedFields = require("../../../utils/remove-excluded-fields");
const {
    LOGIN_FAILED,
    USER_EXCLUDED_FIELDS,
} = require("../../../commons/constants");

module.exports = {
    async execute(userData) {
        try {
            const user = await userMongo.getUserByUsername(userData.username);
            if (user.password !== userData.password) {
                throw new Error(LOGIN_FAILED);
            }
            const loggedUser = removeExcludedFields(
                user.toJSON(),
                USER_EXCLUDED_FIELDS
            );
            return loggedUser;
        } catch (error) {
            throw error;
        }
    },
};
