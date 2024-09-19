const userMongo = require("../../mongo/user-mongo");
const { USER_EXCLUDED_FIELDS } = require("../../../commons/constants");
const removeExcludedFields = require("../../../utils/remove-excluded-fields");

module.exports = {
    async execute(userId, userData) {
        try {
            const user = await userMongo.updateUser(userId, userData);
            const updatedUser = removeExcludedFields(
                user.toJSON(),
                USER_EXCLUDED_FIELDS
            );
            return updatedUser;
        } catch (error) {
            throw error;
        }
    },
};
