const userMongo = require("../../mongo/user-mongo");
const removeExcludedFields = require("../../../utils/remove-excluded-fields");
const { USER_EXCLUDED_FIELDS } = require("../../../commons/constants");

module.exports = {
    async execute(userId) {
        try {
            const user = await userMongo.getUserById(userId);
            const singleUser = removeExcludedFields(
                user.toJSON(),
                USER_EXCLUDED_FIELDS
            );
            return singleUser;
        } catch (error) {
            throw error;
        }
    },
};
