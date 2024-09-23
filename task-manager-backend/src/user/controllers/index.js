const { signupUser } = require("./signup-user/signup-user");
const { loginUser } = require("./login-user/login-user");
const { logoutUser } = require("./logout-user/logout-user");
const { getAllUsers } = require("./get-all-user/get-all-user");
const { getUserById } = require("./get-user-by-id/get-user-by-id");
const { updateUserById } = require("./update-user-by-id/update-user-by-id");
const { deleteUserById } = require("./delete-user-by-id/delete-user-by-id");

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
