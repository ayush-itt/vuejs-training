const asyncHandler = require("../../../utils/async-handler");
const ApiResponse = require("../../../utils/api-response");
const ApiError = require("../../../utils/api-error");
const { deleteUserUsecase } = require("../../usecases");

const { USER_DELETE_SUCCESS } = require("../../../commons/constants");

module.exports = {
    deleteUser: {
        path: "/",
        reqType: "delete",
        method: asyncHandler(async (req, res) => {
            const userId = req.session.userId;
            await deleteUserUsecase.execute(userId);
            req.session.destroy(function (err) {
                if (err) throw new ApiError(500, err.message);
            });
            res.status(204).json(
                new ApiResponse(204, true, USER_DELETE_SUCCESS)
            );
        }),
    },
};
