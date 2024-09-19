const mailMongo = require("../../../mail/mongo/mail-mongo");

module.exports = {
    async execute(userId) {
        try {
            await mailMongo.deleteAllMails(userId);
        } catch (error) {
            throw error;
        }
    },
};
