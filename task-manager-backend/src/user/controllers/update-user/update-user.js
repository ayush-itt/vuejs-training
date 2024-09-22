const ApiResponse = require("../../../utils/api-response");
const ApiError = require("../../../utils/api-error");
const { updateUserUsecase } = require("../../usecases");

const { USER_UPDATE_SUCCESS } = require("../../../commons/constants");

module.exports = {
    updateUser: {
        path: "/profile",
        reqType: "patch",

        method: async (req, res, next) => {
            try {
                const userId = req.session.userId;
                const { username, email, password, image } = req.body;
                const response = await updateUserUsecase.execute(userId, {
                    username,
                    email,
                    password,
                    image,
                });
                res.status(201).json(
                    new ApiResponse(201, response, USER_UPDATE_SUCCESS)
                );
            } catch (error) {
                next(new ApiError(400, error.message));
            }
        },
    },
};
