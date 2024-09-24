const userMongo = require("../../../user/mongo/user-mongo");
const createMailLog = require("../create-mail-log/create-mail-log");
const getEmailTemplate = require("../../helpers/get-email-template");
const sendMailHelper = require("../../helpers/send-mail-helper");
const {
    PROFILE_FETCH_FAILED,
    TASK_ASSIGN_EMAIL,
    WELCOME_EMAIL,
} = require("../../../commons/constants");

const sender = process.env.MAIL_USER;

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

async function getEmailList(emailType, userId, adminId) {
    try {
        const receiverList = [],
            ccList = [];
        switch (emailType) {
            case TASK_ASSIGN_EMAIL:
                ccList.push(await getAdminEmailById(adminId));
            case WELCOME_EMAIL:
                receiverList.push(await getUserEmailById(userId));
                break;
            default:
                break;
        }
        return { receiverList, ccList };
    } catch (error) {
        throw new Error(PROFILE_FETCH_FAILED);
    }
}

module.exports = {
    async execute(emailType, userId, adminId = undefined) {
        try {
            const { receiverList, ccList } = await getEmailList(
                emailType,
                userId,
                adminId
            );

            const { subject, content, htmlTemplate } = getEmailTemplate(
                emailType,
                receiverList,
                ccList
            );

            const response = await sendMailHelper({
                sender,
                receiverList,
                ccList,
                subject,
                content,
                htmlTemplate,
            });
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
    },
};
