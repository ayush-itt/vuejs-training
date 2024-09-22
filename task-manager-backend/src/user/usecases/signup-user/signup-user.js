const userMongo = require("../../mongo/user-mongo");
const { sendMailUsecase } = require("../../../mail/usecases");
const removeExcludedFields = require("../../../utils/remove-excluded-fields");

const {
    CREATE_FAILED,
    USER_EXCLUDED_FIELDS,
} = require("../../../commons/constants");

async function isUserAlreadyExist(userData) {
    try {
        const user = await userMongo.getUserByUsername(userData.username);
        return user ? true : false;
    } catch (error) {
        throw error;
    }
}

async function sendWelcomeEmail(userId) {
    try {
        await sendMailUsecase.execute("welcome_email", userId);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    async execute(userData) {
        try {
            if (await isUserAlreadyExist()) throw new Error(CREATE_FAILED);

            const response = await userMongo.createUser(userData);
            const newUser = removeExcludedFields(
                response.toJSON(),
                USER_EXCLUDED_FIELDS
            );
            await sendWelcomeEmail(newUser._id);
            return newUser;
        } catch (error) {
            throw error;
        }
    },
};
