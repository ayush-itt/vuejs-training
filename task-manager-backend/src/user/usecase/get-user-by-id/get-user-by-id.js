const mongo = require("../../mongo/user-mongo");
const removeExcludedFields = require("../../../utils/remove-excluded-fields");
const { USER_EXCLUDED_FIELDS } = require("../../../commons/constants");

exports.execute = async (userId) => {
    try {
        const user = await mongo.getUserById(userId);
        const singleUser = removeExcludedFields(
            user.toJSON(),
            USER_EXCLUDED_FIELDS
        );
        return singleUser;
    } catch (error) {
        throw error;
    }
};
