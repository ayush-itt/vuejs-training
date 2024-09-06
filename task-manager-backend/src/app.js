const express = require("express");
const { notFound, errorHandler } = require("./middlewares/error.middleware");

const app = express();
app.use(express.json());

app.get("/", (req, res) =>
    res.status(200).json({ message: "Welcome to Task Manager Backend!" })
);

// APIs routes

app.use(notFound);
app.use(errorHandler);

module.exports = app;
