const User = require("./user-model");

const {
    CREATE_FAILED,
    PROFILE_FETCH_FAILED,
    USER_UPDATE_FAILED,
    USER_DELETE_FAILED,
} = require("../../commons/constants");

const createUser = async (user) => {
    try {
        return await User.create(user);
    } catch (error) {
        throw new Error(CREATE_FAILED);
    }
};

const getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error(PROFILE_FETCH_FAILED);
    }
};

const getUserByUsername = async (username) => {
    try {
        return await User.findOne({ username: username });
    } catch (error) {
        throw new Error(PROFILE_FETCH_FAILED);
    }
};

const getUserById = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        throw new Error(PROFILE_FETCH_FAILED);
    }
};

const updateUser = async (id, user) => {
    try {
        return await User.findByIdAndUpdate(id, user, {
            new: true,
        });
    } catch (error) {
        throw new Error(USER_UPDATE_FAILED);
    }
};

const deleteUser = async (id) => {
    try {
        await User.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(USER_DELETE_FAILED);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByUsername,
    getUserById,
    updateUser,
    deleteUser,
};
