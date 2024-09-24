const ApiResponse = require("../../../utils/api-response");
const ApiError = require("../../../utils/api-error");
const { deleteUserByIdUsecase } = require("../../usecases");
const { USER_DELETE_SUCCESS } = require("../../../commons/constants");

module.exports = {
    deleteUserById: {
        path: "/users",
        reqType: "delete",
        method: async (req, res, next) => {
            try {
                const userId = req.session.userId;
                await deleteUserByIdUsecase.execute(userId);
                req.session.destroy(function (err) {
                    if (err) throw new Error(err.message);
                });
                res.status(204).json(
                    new ApiResponse(204, true, USER_DELETE_SUCCESS)
                );
            } catch (error) {
                next(new ApiError(400, error.message));
            }
        },
    },
};
