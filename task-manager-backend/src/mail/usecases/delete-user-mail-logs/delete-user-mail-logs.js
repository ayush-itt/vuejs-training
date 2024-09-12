const ApiError = require("../../../utils/api-error");
const mailMongo = require("../../../mail/mongo/mail-mongo");
const { MAIL_DELETE_FAILED } = require("../../../commons/constants");

exports.execute = async (userId) => {
    try {
        await mailMongo.deleteAllMails(userId);
        return true;
    } catch (error) {
        throw new ApiError(401, MAIL_DELETE_FAILED);
    }
};
