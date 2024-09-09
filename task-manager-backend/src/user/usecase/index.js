const signupUser = require("./signup-user/signup-user");
const loginUser = require("./login-user/login-user");
const getAllUser = require("./get-all-user/get-all-user");
const getSingleUser = require("./get-single-user/get-single-user");
const updateUser = require("./update-user/update-user");
const deleteUser = require("./delete-user/delete-user");

module.exports = {
    signupUser,
    loginUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
};
