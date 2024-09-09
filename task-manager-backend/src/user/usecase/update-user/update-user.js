const mongo = require("../../mongo/user-mongo");

exports.execute = async (userData) => {
    try {
        const user = await mongo.updateUser(userData.id, userData);
        return user;
    } catch (error) {
        throw error;
    }
};
