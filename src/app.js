const express = require("express");
const cors = require("cors");
require("dotenv").config();

// ✅ Routes
const authRoutes = require("./routes/auth.routes");
const questionRoutes = require("./routes/questions.routes");
const attemptRoutes = require("./routes/attempt.routes");
const userRoutes = require("./routes/users.routes");


const app = express();

/* =========================================
   ✅ Middlewares
========================================= */

// ✅ CORS — locked to production frontend + local dev
const ALLOWED_ORIGINS = [
  "https://ciet-placementtraining.vercel.app",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, curl)
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS: Origin not allowed — " + origin), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ JSON Body Parser
app.use(express.json());

/* =========================================
   ✅ Test Route
========================================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ CIET Learning Backend Running",
  });
});

/* =========================================
   ✅ API Routes
========================================= */
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/attempt", attemptRoutes);
app.use("/api/users", userRoutes);
app.use("/api/result", require("./routes/result.routes"));
app.use("/api", require("./routes/submit.routes")); // ✅ NEW: submit, leaderboard, dashboard, results, certificate
app.use("/api/admin", require("./routes/admin.routes")); // ✅ Admin Analytics

/* =========================================
   ✅ 404 Route Not Found Handler
========================================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `❌ Route not found: ${req.method} ${req.originalUrl}`,
  });
});

/* =========================================
   ✅ Global Error Handler
========================================= */
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;

