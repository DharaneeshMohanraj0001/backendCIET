const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    dept: { type: String, required: true },
    year: { type: String, required: true },

    password: { type: String, required: true },

    credits: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
    certificates: { type: [Object], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
