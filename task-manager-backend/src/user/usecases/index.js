const signupUserUsecase = require("./signup-user/signup-user");
const loginUserUsecase = require("./login-user/login-user");
const getAllUserUsecase = require("./get-all-user/get-all-user");
const getUserByIdUsecase = require("./get-user-by-id/get-user-by-id");
const updateUserByIdUsecase = require("./update-user-by-id/update-user-by-id");
const deleteUserByIdUsecase = require("./delete-user-by-id/delete-user-by-id");

module.exports = {
    signupUserUsecase,
    loginUserUsecase,
    getAllUserUsecase,
    getUserByIdUsecase,
    updateUserByIdUsecase,
    deleteUserByIdUsecase,
};
