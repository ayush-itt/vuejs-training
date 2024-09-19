const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const { loginUserUsecase } = require("../../usecases");

const { LOGIN_SUCCESS } = require("../../../commons/constants");

module.exports = {
    loginUser: {
        path: "/login",
        reqType: "post",
        method: asyncHandler(async (req, res) => {
            const { username, password } = req.body;
            const response = await loginUserUsecase.execute({
                username,
                password,
            });
            req.session.auth = true;
            req.session.userId = response._id;
            req.session.isAdmin = response.isAdmin;
            res.status(201).json(new ApiResponse(201, {}, LOGIN_SUCCESS));
        }),
    },
};
