const createWelcomeEmailTemplate = require("../templates/create-welcome-email-template");
const createTaskAssignEmailTemplate = require("../templates/create-task-assign-email-template");
const {
    WELCOME_EMAIL,
    TASK_ASSIGN_EMAIL,
    INVALID_MAIL_TYPE,
} = require("../../commons/constants");

const getEmailTemplate = (emailType, receiverList, ccList = []) => {
    switch (emailType) {
        case WELCOME_EMAIL:
            return createWelcomeEmailTemplate(receiverList);
        case TASK_ASSIGN_EMAIL:
            return createTaskAssignEmailTemplate(receiverList, ccList);
        default:
            throw new Error(INVALID_MAIL_TYPE);
    }
};

module.exports = getEmailTemplate;
