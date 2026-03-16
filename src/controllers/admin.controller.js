const AssessmentAttempt = require("../models/AssessmentAttempt");
const Leaderboard = require("../models/Leaderboard");
const Certificate = require("../models/Certificate");

/* =========================================================
   GET /api/admin/active-students
   Returns the current active students mapped in memory
========================================================= */
exports.getActiveStudents = (req, res) => {
    try {
        const activeStudents = req.app.get("activeStudents");
        if (!activeStudents) return res.json({ success: true, active: [] });
        return res.json({ success: true, active: Array.from(activeStudents.values()) });
    } catch (err) {
        console.error("❌ Admin getActiveStudents error:", err);
        return res.status(500).json({ message: "Failed to fetch active students" });
    }
};

/* =========================================================
   GET /api/admin/analytics
   Returns average scores, total attempts, department stats
========================================================= */
exports.getAnalytics = async (req, res) => {
    try {
        // 1. Total Attempts
        const totalAttempts = await AssessmentAttempt.countDocuments();

        // 2. Average Score Overall
        const allAttempts = await AssessmentAttempt.find({}, "score").lean();
        const avgScore = totalAttempts
            ? Math.round(allAttempts.reduce((sum, a) => sum + (a.score || 0), 0) / totalAttempts)
            : 0;

        // 3. Total Certificates Issued
        const totalCertificates = await Certificate.countDocuments();

        // 4. Department Performance (Aggregation)
        const deptStats = await AssessmentAttempt.aggregate([
            {
                $group: {
                    _id: "$dept",
                    avgScore: { $avg: "$score" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { avgScore: -1 } }
        ]);

        // 5. Top 5 Students
        const topStudents = await Leaderboard.find({})
            .sort({ score: -1, completionTime: 1 })
            .limit(5)
            .lean();

        return res.json({
            success: true,
            data: {
                totalAttempts,
                avgScore,
                totalCertificates,
                deptStats: deptStats.map(d => ({ dept: d._id || "Unknown", avgScore: Math.round(d.avgScore), attempts: d.count })),
                topStudents
            }
        });

    } catch (err) {
        console.error("❌ Admin getAnalytics error:", err);
        return res.status(500).json({ message: "Failed to fetch admin analytics" });
    }
};
