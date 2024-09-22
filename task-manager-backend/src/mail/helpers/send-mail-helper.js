const transporter = require("../../config/nodemailer-config");

const { MAIL_SEND_FAILED } = require("../../commons/constants");

const sendMailHelper = async ({
    sender,
    receiverList,
    ccList,
    subject,
    content,
    htmlTemplate,
}) => {
    const mailOptions = {
        from: `Task Manager <${sender}>`,
        to: receiverList?.join(", "),
        cc: ccList?.join(", "),
        subject: subject,
        text: content,
        html: htmlTemplate,
    };

    try {
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error(MAIL_SEND_FAILED);
    }
};

module.exports = sendMailHelper;
