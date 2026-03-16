const mongoose = require("mongoose");

/**
 * Leaderboard – one cached entry per user (upserted on every submission).
 * Sorted by: score DESC → completionTime ASC → submittedAt ASC
 */
const leaderboardSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,   // one entry per user
        },

        name: { type: String, default: "" },
        dept: { type: String, default: "" },
        year: { type: String, default: "" },

        // Best attempt stats
        score: { type: Number, default: 0 },
        completionTime: { type: Number, default: 0 },   // seconds
        submittedAt: { type: Date, default: Date.now },

        // Computed after sort
        rank: { type: Number, default: 0 },

        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: false }
);

// Compound index mirrors the sorting priority
leaderboardSchema.index({ score: -1, completionTime: 1, submittedAt: 1 });

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
