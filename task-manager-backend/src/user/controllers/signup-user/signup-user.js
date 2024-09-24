const ApiResponse = require("../../../utils/api-response");
const ApiError = require("../../../utils/api-error");
const { signupUserUsecase } = require("../../usecases");
const { CREATE_SUCCESS } = require("../../../commons/constants");

module.exports = {
    signupUser: {
        path: "/users/signup",
        reqType: "post",
        method: async (req, res, next) => {
            try {
                const { username, email, password, image, isAdmin } = req.body;
                const response = await signupUserUsecase.execute({
                    username,
                    email,
                    password,
                    image,
                    isAdmin,
                });
                res.status(201).json(
                    new ApiResponse(201, response, CREATE_SUCCESS)
                );
            } catch (error) {
                next(new ApiError(400, error.message));
            }
        },
    },
};
