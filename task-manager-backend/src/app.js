const express = require("express");
require("dotenv").config({ path: "./.env" });
const sessionMiddleware = require("./middlewares/session-middleware");
const { notFound, errorHandler } = require("./middlewares/error-middleware");
const userApi = require("./user/api/user-api");
const taskApi = require("./task/api/task-api");

const app = express();
app.use(express.json());
app.use(sessionMiddleware);

app.get("/", (req, res) =>
    res.status(200).json({ message: "Welcome to Task Manager Backend!" })
);

// APIs routes
app.use("/users", userApi);
app.use("/tasks", taskApi);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
