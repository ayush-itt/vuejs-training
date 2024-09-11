const mongo = require("../../mongo/user-mongo");
const { USER_EXCLUDED_FIELDS } = require("../../../commons/constants");
const removeExcludedFields = require("../../../utils/remove-excluded-fields");

exports.execute = async (userId, userData) => {
    try {
        const user = await mongo.updateUser(userId, userData);
        const updatedUser = removeExcludedFields(
            user.toJSON(),
            USER_EXCLUDED_FIELDS
        );
        return updatedUser;
    } catch (error) {
        throw error;
    }
};
