const ApiError = require("../../../utils/api-error");
const userMongo = require("../../../user/mongo/user-mongo");
const createMailLog = require("../create-mail-log/create-mail-log");

const getEmailTemplate = require("../../helpers/get-email-template");
const sendMailHelper = require("../../helpers/send-mail-helper");

const sender = process.env.MAIL_USER;
const { PROFILE_FETCH_FAILED } = require("../../../commons/constants");

exports.execute = async (emailType, userId, adminId = undefined) => {
    const receiverList = [],
        ccList = [];
    if (emailType == "welcome_email" || emailType == "task_assign_email") {
        const user = await userMongo.getUserById(userId.toString());
        if (!user) throw new ApiError(401, PROFILE_FETCH_FAILED);
        receiverList.push(user.email);
        if (emailType == "task_assign_email") {
            const admin = await userMongo.getUserById(adminId.toString());
            if (!admin || !admin.isAdmin)
                throw new ApiError(401, PROFILE_FETCH_FAILED);
            ccList.push(admin.email);
        }
    }

    const { subject, content, htmlTemplate } = getEmailTemplate(
        emailType,
        receiverList,
        ccList
    );

    const mailData = {
        sender,
        receiverList,
        ccList,
        subject,
        content,
        htmlTemplate,
    };

    try {
        const response = await sendMailHelper(mailData);
        await createMailLog.execute({
            userId,
            sender,
            receiverList,
            ccList,
            emailType,
        });
        return response;
    } catch (error) {
        await createMailLog.execute({
            userId,
            sender,
            receiverList,
            ccList,
            emailType,
            status: "failed",
            errorDetails: error.message,
        });
        throw error;
    }
};
