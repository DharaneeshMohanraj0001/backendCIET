const mongoose = require("mongoose");

/**
 * AssessmentAttempt – stores ONE full assessment session summary.
 * (The old per-question Attempt model is kept unchanged.)
 */
const assessmentAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ✅ FIX: store student identity on every attempt record
    username: { type: String, default: "" },
    rollNo:   { type: String, default: "" },

    assessmentType: {
      type: String,
      enum: ["aptitude", "dsa"],
      required: true,
    },

    mode: { type: String, enum: ["practice", "workout"], default: "workout" },

    dept: { type: String, default: "" },
    year: { type: String, default: "" },

    totalQuestions: { type: Number, required: true },
    attemptedQuestions: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    wrongAnswers: { type: Number, default: 0 },

    // score = correct * 10 + time bonus (calculated on submit)
    score: { type: Number, default: 0 },

    // seconds taken to complete
    completionTime: { type: Number, default: 0 },

    submittedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

// Compound index for leaderboard queries
assessmentAttemptSchema.index({ score: -1, completionTime: 1, submittedAt: 1 });

// Explicitly name the collection 'assessmentattempts' so we don't mix with singular 'attempts' tracking
module.exports = mongoose.model("AssessmentAttempt", assessmentAttemptSchema, "assessmentattempts");
