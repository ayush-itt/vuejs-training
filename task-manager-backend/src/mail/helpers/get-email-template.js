const createWelcomeEmailTemplate = require("../templates/create-welcome-email-template");
const createTaskAssignEmailTemplate = require("../templates/create-task-assign-email-template");

const getEmailTemplate = (emailType, receiverList, ccList = []) => {
    switch (emailType) {
        case "welcome_email":
            return createWelcomeEmailTemplate(receiverList);
        case "task_assign_email":
            return createTaskAssignEmailTemplate(receiverList, ccList);
        default:
            throw new Error("Invalid email type");
    }
};

module.exports = getEmailTemplate;
