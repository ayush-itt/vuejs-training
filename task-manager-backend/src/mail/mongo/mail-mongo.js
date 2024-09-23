const Mail = require("./mail-model");
const {
    MAIL_CREATE_FAILED,
    MAIL_FETCH_FAILED,
    MAIL_UPDATE_FAILED,
    MAIL_DELETE_FAILED,
} = require("../../commons/constants");

const createMail = async (data) => {
    try {
        return await Mail.create(data);
    } catch (error) {
        throw new Error(MAIL_CREATE_FAILED);
    }
};

const getMailsByUserId = async (userId) => {
    try {
        return await Mail.find({ userId });
    } catch (error) {
        throw new Error(MAIL_FETCH_FAILED);
    }
};

const getMailById = async (mailId, userId) => {
    try {
        const mail = await Mail.findOne({ _id: mailId, userId });
        if (!mail) throw new Error();
        return mail;
    } catch (error) {
        throw new Error(MAIL_FETCH_FAILED);
    }
};

const updateMailStatus = async (mailId, status) => {
    try {
        return await Mail.findOneAndUpdate(
            { _id: mailId },
            { status },
            { new: true }
        );
    } catch (error) {
        throw new Error(MAIL_UPDATE_FAILED);
    }
};

const deleteMailById = async (mailId) => {
    try {
        await Mail.findOneAndDelete({ _id: mailId });
    } catch (error) {
        throw new Error(MAIL_DELETE_FAILED);
    }
};

const deleteMailsByUserId = async (userId) => {
    try {
        await Mail.deleteMany({ userId });
    } catch (error) {
        throw new Error(MAIL_DELETE_FAILED);
    }
};

module.exports = {
    createMail,
    getMailsByUserId,
    getMailById,
    updateMailStatus,
    deleteMailById,
    deleteMailsByUserId,
};
