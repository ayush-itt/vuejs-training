const mongo = require("../../mongo/user-mongo");
exports.execute = async (id) => {
    try {
        const users = await mongo.deleteUser(id);
        return users;
    } catch (error) {
        throw error;
    }
};
