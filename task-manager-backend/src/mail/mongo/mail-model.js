const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sender: {
            type: String,
            required: true,
        },
        receiverList: {
            type: [String],
            required: true,
        },
        ccList: {
            type: [String],
            default: [],
        },
        emailType: {
            type: String,
            enum: ["welcome_email", "task_assign_email"],
            required: true,
        },
        status: {
            type: String,
            enum: ["sent", "failed"],
            default: "sent",
        },
        errorDetails: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Mail = mongoose.model("MailLog", mailSchema);
module.exports = Mail;
