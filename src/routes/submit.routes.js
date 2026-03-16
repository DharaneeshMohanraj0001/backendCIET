const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/submit.controller");

/* ── Assessment Submission ─────────────────────── */
// POST /api/submit-assessment
router.post("/submit-assessment", auth, ctrl.submitAssessment);

/* ── Leaderboard ────────────────────────────────── */
// GET /api/leaderboard  (public)
router.get("/leaderboard", ctrl.getLeaderboardRanked);

/* ── Dashboard ─────────────────────────────────── */
// GET /api/dashboard/:userId
router.get("/dashboard/:userId", auth, ctrl.getDashboard);

/* ── Attempts ──────────────────────────────────── */
// GET /api/attempts/:userId
router.get("/attempts/:userId", auth, ctrl.getAttempts);

/* ── Single Result ─────────────────────────────── */
// GET /api/results/:attemptId
router.get("/results/:attemptId", auth, ctrl.getResultById);

/* ── Certificates ──────────────────────────────── */
// GET /api/certificate/:userId
router.get("/certificate/:userId", auth, ctrl.getCertificate);

module.exports = router;
