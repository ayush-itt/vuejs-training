const mongo = require("../../mongo/user-mongo");

exports.execute = async (id) => {
    try {
        const user = await mongo.getUserById(id);
        return user;
    } catch (error) {
        throw error;
    }
};
