const ApiError = require("../../../utils/api-error");
const mailMongo = require("../../../mail/mongo/mail-mongo");
const { MAIL_CREATE_FAILED } = require("../../../commons/constants");

exports.execute = async (mailData) => {
    try {
        const createdMail = await mailMongo.createMail(mailData);
        return createdMail;
    } catch (error) {
        throw new ApiError(401, MAIL_CREATE_FAILED);
    }
};
