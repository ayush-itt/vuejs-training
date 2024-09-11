const signupUserUsecase = require("./signup-user/signup-user");
const loginUserUsecase = require("./login-user/login-user");
const getAllUserUsecase = require("./get-all-user/get-all-user");
const getUserByIdUsecase = require("./get-user-by-id/get-user-by-id");
const updateUserUsecase = require("./update-user/update-user");
const deleteUserUsecase = require("./delete-user/delete-user");

module.exports = {
    signupUserUsecase,
    loginUserUsecase,
    getAllUserUsecase,
    getUserByIdUsecase,
    updateUserUsecase,
    deleteUserUsecase,
};
