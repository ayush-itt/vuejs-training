const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Task title is required"],
        },
        dueDate: {
            type: Date,
            required: [true, "Due date is required"],
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },
        status: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
