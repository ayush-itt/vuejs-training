const mongo = require("../../mongo/user-mongo");
const removeExcludedFields = require("../../../utils/remove-excluded-fields");
const { USER_EXCLUDED_FIELDS } = require("../../../commons/constants");
exports.execute = async () => {
    try {
        const users = await mongo.getAllUsers();
        const allUsers = users.map((user) =>
            removeExcludedFields(user.toJSON(), USER_EXCLUDED_FIELDS)
        );
        return allUsers;
    } catch (error) {
        throw error;
    }
};
