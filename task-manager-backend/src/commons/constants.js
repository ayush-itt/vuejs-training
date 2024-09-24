const Constants = {
    // ------------------------------------ Auth ------------------------------------------ //

    UNAUTHORIZED_REQUEST: "Unauthorized request!!",
    EXPIRED_SESSION_TOKEN: "Expired session token!!",

    // ------------------------------------ Auth ------------------------------------------ //

    // ------------------------------------ User ------------------------------------------ //

    CREATE_SUCCESS: "User created successful!!",
    CREATE_FAILED:
        "Invalid user information or user already exists, unable to create user!!",

    LOGIN_SUCCESS: "User logged In successful!!",
    LOGIN_FAILED: "Invalid username or password!!",
    LOGGED_IN_ALREADY: "User already logged in!!",

    LOGOUT_SUCCESS: "User logged out successful!!",
    LOGOUT_FAILED: "User logged out failed!!",

    PROFILE_FETCH_SUCCESS: "User profile fetched successful!!",
    PROFILE_FETCH_FAILED: "Unable to fetch user profile!!",

    USER_UPDATE_SUCCESS: "User updated successfully!!",
    USER_UPDATE_FAILED: "Unable to update user!!",

    USER_DELETE_SUCCESS: "User deleted successfully!!",
    USER_DELETE_FAILED: "Unable to delete user!!",

    USER_EXCLUDED_FIELDS: "-password -__v",

    // ------------------------------------ User ------------------------------------------ //

    // ------------------------------------ Task ------------------------------------------ //

    TASK_CREATE_SUCCESS: "Task created successfully!!",
    TASK_CREATE_FAILED: "Task creation failed!!",

    TASK_FETCH_SUCCESS: "Task fetched successfully!!",
    TASK_FETCH_FAILED: "Task fetch failed!!",

    TASK_UPDATE_SUCCESS: "Task updated successfully!!",
    TASK_UPDATE_FAILED: "Task update failed!!",

    TASK_DELETE_SUCCESS: "Task deleted successfully!!",
    TASK_DELETE_FAILED: "Task delete failed!!",

    // ------------------------------------ Task ------------------------------------------ //

    // ------------------------------------ Mail ------------------------------------------ //

    MAIL_CREATE_SUCCESS: "Mail created successfully!!",
    MAIL_CREATE_FAILED: "Mail creation failed!!",

    MAIL_FETCH_SUCCESS: "Mail fetched successfully!!",
    MAIL_FETCH_FAILED: "Mail fetch failed!!",

    MAIL_UPDATE_SUCCESS: "Mail updated successfully!!",
    MAIL_UPDATE_FAILED: "Mail update failed!!",

    MAIL_DELETE_SUCCESS: "Mail deleted successfully!!",
    MAIL_DELETE_FAILED: "Mail delete failed!!",

    WELCOME_EMAIL: "welcome_email",
    TASK_ASSIGN_EMAIL: "task_assign_email",
    INVALID_MAIL_TYPE: "Invalid mail type!!",

    MAIL_SEND_FAILED: "Mail send failed!!",

    // ------------------------------------ Mail ------------------------------------------ //
};

module.exports = Constants;
