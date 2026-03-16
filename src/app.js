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

// ✅ CORS (allow frontend like Live Server: 5500, Vite: 5173 etc.)
app.use(
  cors({
    origin: "*", // ✅ allow all (for development)
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
