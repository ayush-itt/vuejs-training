const { signupUser } = require("./signup-user/signup-user");
const { loginUser } = require("./login-user/login-user");
const { logoutUser } = require("./logout-user/logout-user");
const { getAllUsers } = require("./get-all-user/get-all-user");
const { getUserById } = require("./get-user-by-id/get-user-by-id");
const { updateUser } = require("./update-user/update-user");
const { deleteUser } = require("./delete-user/delete-user");

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
