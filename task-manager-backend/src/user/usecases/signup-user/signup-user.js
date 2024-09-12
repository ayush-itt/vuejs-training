const userMongo = require("../../mongo/user-mongo");
const ApiError = require("../../../utils/api-error");
const { sendMailUsecase } = require("../../../mail/usecases");
const removeExcludedFields = require("../../../utils/remove-excluded-fields");
const {
    CREATE_FAILED,
    USER_EXCLUDED_FIELDS,
} = require("../../../commons/constants");

exports.execute = async (userData) => {
    try {
        const user = await userMongo.getUserByUsername(userData.username);
        if (user) {
            throw new ApiError(401, CREATE_FAILED);
        }
        const response = await userMongo.createUser(userData);
        const newUser = removeExcludedFields(
            response.toJSON(),
            USER_EXCLUDED_FIELDS
        );
        await sendMailUsecase.execute("welcome_email", newUser._id);
        return newUser;
    } catch (error) {
        throw error;
    }
};
