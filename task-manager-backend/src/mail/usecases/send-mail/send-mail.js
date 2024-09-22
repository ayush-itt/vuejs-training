const userMongo = require("../../../user/mongo/user-mongo");
const createMailLog = require("../create-mail-log/create-mail-log");

const getEmailTemplate = require("../../helpers/get-email-template");
const sendMailHelper = require("../../helpers/send-mail-helper");

const sender = process.env.MAIL_USER;
const {
    PROFILE_FETCH_FAILED,
    MAIL_CREATE_FAILED,
    TASK_ASSIGN_EMAIL,
    WELCOME_EMAIL,
} = require("../../../commons/constants");

async function getUserEmailById(userId) {
    try {
        const user = await userMongo.getUserById(userId.toString());
        if (!user) throw new Error();
        return user.email;
    } catch (error) {
        throw new Error(PROFILE_FETCH_FAILED);
    }
}

async function getAdminEmailById(adminId) {
    try {
        const admin = await userMongo.getUserById(adminId.toString());
        if (!admin || !admin.isAdmin) throw new Error();
        return admin.email;
    } catch (error) {
        throw new Error(PROFILE_FETCH_FAILED);
    }
}

async function getEmailList(emailType) {
    try {
        const receiverList = [],
            ccList = [];
        switch (emailType) {
            case TASK_ASSIGN_EMAIL:
                const adminEmail = await getAdminEmailById(adminId);
                ccList.push(adminEmail);
            case WELCOME_EMAIL:
                const userEmail = await getUserEmailById(userId);
                receiverList.push(userEmail);
                break;
            default:
                break;
        }
        return { receiverList, ccList };
    } catch (error) {
        throw new Error(PROFILE_FETCH_FAILED);
    }
}

async function logMailOperation(mailLogData) {
    try {
        await createMailLog.execute(mailLogData);
    } catch (error) {
        throw new Error(MAIL_CREATE_FAILED);
    }
}

module.exports = {
    async execute(emailType, userId, adminId = undefined) {
        try {
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
