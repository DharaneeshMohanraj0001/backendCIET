const mongoose = require("mongoose");

/**
 * Certificate – auto-generated when a user passes an assessment (score ≥ 60 %).
 */
const certificateSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        assessmentAttemptId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AssessmentAttempt",
        },

        assessmentType: {
            type: String,
            enum: ["aptitude", "dsa"],
            required: true,
        },

        userName:       { type: String, default: "" },
        rollNo:         { type: String, default: "" },
        dept:           { type: String, default: "" },
        year:           { type: String, default: "" },
        assessmentName: { type: String, default: "" },

        score: { type: Number, required: true },
        grade: { type: String, default: "F" },

        issueDate:      { type: Date, default: Date.now },
        certificateURL: { type: String, default: "" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
