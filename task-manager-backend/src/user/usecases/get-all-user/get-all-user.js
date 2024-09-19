const userMongo = require("../../mongo/user-mongo");
const removeExcludedFields = require("../../../utils/remove-excluded-fields");
const { USER_EXCLUDED_FIELDS } = require("../../../commons/constants");

module.exports = {
    async execute() {
        try {
            const users = await userMongo.getAllUsers();
            const allUsers = users.map((user) =>
                removeExcludedFields(user.toJSON(), USER_EXCLUDED_FIELDS)
            );
            return allUsers;
        } catch (error) {
            throw error;
        }
    },
};
