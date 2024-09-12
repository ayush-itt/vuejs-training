const ApiError = require("../../utils/api-error");
const Mail = require("./mail-model");
const {
    MAIL_CREATE_FAILED,
    MAIL_FETCH_FAILED,
    MAIL_UPDATE_FAILED,
    MAIL_DELETE_FAILED,
} = require("../../commons/constants");

const createMail = async (data) => {
    try {
        const mail = await Mail.create(data);
        return mail;
    } catch (error) {
        throw new ApiError(401, MAIL_CREATE_FAILED);
    }
};

const getAllMailsByUserId = async (userId) => {
    try {
        const mails = await Mail.find({ userId });
        return mails;
    } catch (error) {
        throw new ApiError(401, MAIL_FETCH_FAILED);
    }
};

const getMailById = async (mailId, userId) => {
    try {
        const mail = await Mail.findOne({ _id: mailId, userId });
        if (!mail) throw new Error();
        return mail;
    } catch (error) {
        throw new ApiError(401, MAIL_FETCH_FAILED);
    }
};

const updateMailStatus = async (mailId, status) => {
    try {
        const updatedMail = await Mail.findOneAndUpdate(
            { _id: mailId },
            { status },
            { new: true }
        );
        return updatedMail;
    } catch (error) {
        throw new ApiError(401, MAIL_UPDATE_FAILED);
    }
};

const deleteMail = async (mailId) => {
    try {
        await Mail.findOneAndDelete({ _id: mailId });
        return true;
    } catch (error) {
        throw new ApiError(401, MAIL_DELETE_FAILED);
    }
};

const deleteAllMails = async (userId) => {
    try {
        await Mail.deleteMany({ userId });
        return true;
    } catch (error) {
        throw new ApiError(401, MAIL_DELETE_FAILED);
    }
};

module.exports = {
    createMail,
    getAllMailsByUserId,
    getMailById,
    updateMailStatus,
    deleteMail,
    deleteAllMails,
};
