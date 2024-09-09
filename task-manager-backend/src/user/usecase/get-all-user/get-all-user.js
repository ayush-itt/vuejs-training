const mongo = require("../../mongo/user-mongo");
exports.execute = async () => {
    try {
        const users = await mongo.getAllUsers();
        return users;
    } catch (error) {
        throw error;
    }
};
