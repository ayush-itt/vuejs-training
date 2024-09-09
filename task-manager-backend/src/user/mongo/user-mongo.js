const ApiError = require("../../utils/api-error");
const User = require("./user-model");

const {
    CREATE_FAILED,
    PROFILE_FETCH_FAILED,
    USER_UPDATE_FAILED,
    USER_DELETE_FAILED,
} = require("../../commons/constants");

const createUser = async (user) => {
    try {
        const newUser = await User.create(user);
        return newUser;
    } catch (error) {
        throw new ApiError(500, CREATE_FAILED);
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new ApiError(500, PROFILE_FETCH_FAILED);
    }
};

const getUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username: username });
        return user;
    } catch (error) {
        throw new ApiError(500, PROFILE_FETCH_FAILED);
    }
};

const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new ApiError(500, PROFILE_FETCH_FAILED);
    }
};

const updateUser = async (id, user) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, {
            new: true,
        });
        return updatedUser;
    } catch (error) {
        throw new ApiError(500, USER_UPDATE_FAILED);
    }
};

const deleteUser = async (id) => {
    try {
        await User.findByIdAndDelete(id);
        return true;
    } catch (error) {
        throw new ApiError(500, USER_DELETE_FAILED);
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
