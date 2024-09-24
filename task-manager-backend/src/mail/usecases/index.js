const createMailLogUsecase = require("./create-mail-log/create-mail-log");
const sendMailUsecase = require("./send-mail/send-mail");
const deleteUserMailLogsUsecase = require("./delete-user-mail-logs/delete-user-mail-logs");

module.exports = {
    createMailLogUsecase,
    sendMailUsecase,
    deleteUserMailLogsUsecase,
};
