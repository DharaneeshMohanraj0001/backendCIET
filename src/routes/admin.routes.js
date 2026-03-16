const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/admin.controller");

// Auth is omitted for brevity in trial, but can be added later
router.get("/analytics", ctrl.getAnalytics);
router.get("/active-students", ctrl.getActiveStudents);

module.exports = router;
