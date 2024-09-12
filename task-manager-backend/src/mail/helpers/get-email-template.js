const createWelcomeEmailTemplate = require("../templates/create-welcome-email-template");
const createTaskAssignEmailTemplate = require("../templates/create-task-assign-email-template");

const getEmailTemplate = (emailType, receiverList, ccList = []) => {
    if (emailType === "welcome_email") {
        return createWelcomeEmailTemplate(receiverList);
    } else if (emailType === "task_assign_email") {
        return createTaskAssignEmailTemplate(receiverList, ccList);
    } else {
        throw new Error("Invalid email type");
    }
};

module.exports = getEmailTemplate;
