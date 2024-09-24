const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const sessionMiddleware = require("./middlewares/session-middleware");
const { notFound, errorHandler } = require("./middlewares/error-middleware");
const userApi = require("./user/api/user-api");
const taskApi = require("./task/api/task-api");

const app = express();
app.use(express.json());
app.use(sessionMiddleware);
app.use(
    cors({
        origin: "http://localhost:8080",
        methods: ["POST", "GET", "PATCH", "DELETE"],
        credentials: true,
    })
);

app.get("/", (req, res) =>
    res.status(200).json({ message: "Welcome to Task Manager Backend!" })
);

app.use(userApi);
app.use(taskApi);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
