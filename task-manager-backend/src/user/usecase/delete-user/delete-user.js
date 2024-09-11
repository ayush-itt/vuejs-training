const mongo = require("../../mongo/user-mongo");
exports.execute = async (id) => {
    try {
        await mongo.deleteUser(id);
        return true;
    } catch (error) {
        throw error;
    }
};
