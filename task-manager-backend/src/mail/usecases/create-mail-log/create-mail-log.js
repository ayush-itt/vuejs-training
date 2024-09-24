const mailMongo = require("../../../mail/mongo/mail-mongo");

module.exports = {
    async execute(mailData) {
        try {
            return await mailMongo.createMail(mailData);
        } catch (error) {
            throw error;
        }
    },
};
