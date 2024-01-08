import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    repository: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "completed", "expired"],
        default: "active",
    },

    points: {
        type: Number,
        required: true,
    },
});

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
