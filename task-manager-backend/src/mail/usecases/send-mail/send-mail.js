const ApiError = require("../../../utils/api-error");
const userMongo = require("../../../user/mongo/user-mongo");
const createMailLog = require("../create-mail-log/create-mail-log");

const getEmailTemplate = require("../../helpers/get-email-template");
const sendMailHelper = require("../../helpers/send-mail-helper");

const sender = process.env.MAIL_USER;
const { PROFILE_FETCH_FAILED } = require("../../../commons/constants");

async function getUserEmailById(userId) {
    const user = await userMongo.getUserById(userId.toString());
    if (!user) {
        throw new ApiError(401, PROFILE_FETCH_FAILED);
    }
    return user.email;
}

async function getAdminEmailById(adminId) {
    const admin = await userMongo.getUserById(adminId.toString());
    if (!admin || !admin.isAdmin) {
        throw new ApiError(401, PROFILE_FETCH_FAILED);
    }
    return admin.email;
}

async function getEmailList(emailType) {
    const receiverList = [],
        ccList = [];
    switch (emailType) {
        case "task_assign_email":
            const adminEmail = await getAdminEmailById(adminId);
            ccList.push(adminEmail);
        case "welcome_email":
            const userEmail = await getUserEmailById(userId);
            receiverList.push(userEmail);
            break;
        default:
            break;
    }
    return { receiverList, ccList };
}

async function logMailOperation(mailLogData) {
    await createMailLog.execute(mailLogData);
}

module.exports = {
    async execute(emailType, userId, adminId = undefined) {
        const { receiverList, ccList } = await getEmailList(emailType);

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
            await logMailOperation({
                userId,
                sender,
                receiverList,
                ccList,
                emailType,
            });
            return response;
        } catch (error) {
            await logMailOperation({
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
    },
};
