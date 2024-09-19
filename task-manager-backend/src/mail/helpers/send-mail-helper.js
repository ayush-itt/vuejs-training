const ApiError = require("../../utils/api-error");
const transporter = require("../../config/nodemailer-config");

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
        throw new ApiError(500, error.message);
    }
};

module.exports = sendMailHelper;
