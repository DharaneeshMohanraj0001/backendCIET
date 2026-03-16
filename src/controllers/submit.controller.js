const AssessmentAttempt = require("../models/AssessmentAttempt");
const Leaderboard       = require("../models/Leaderboard");
const Certificate       = require("../models/Certificate");
const User              = require("../models/User");

/* ─── grade helper ─────────────────────────────── */
function computeGrade(score) {
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    return "F";
}

/* ─── recalculate leaderboard ranks ────────────── */
async function recalculateRanks() {
    const entries = await Leaderboard.find({}).sort({ score:-1, completionTime:1, submittedAt:1 });
    const bulkOps = entries.map((e, i) => ({
        updateOne: { filter:{ _id:e._id }, update:{ $set:{ rank: i+1 } } }
    }));
    if (bulkOps.length) await Leaderboard.bulkWrite(bulkOps);
}

/* =================================================
   POST /api/submit-assessment
================================================= */
exports.submitAssessment = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            assessmentType,
            mode,
            totalQuestions,
            correctAnswers,
            wrongAnswers,
            attemptedQuestions,
            completionTime,
        } = req.body;

        // 1. Fetch user
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // 2. Pure percentage score — no bonuses
        const score = totalQuestions > 0
            ? Math.round((correctAnswers / totalQuestions) * 100)
            : 0;

        // 3. Save attempt
        const attempt = await AssessmentAttempt.create({
            userId,
            username:           user.name,
            rollNo:             user.rollNo  || "",
            assessmentType,
            mode:               mode         || "workout",
            dept:               user.dept,
            year:               user.year,
            totalQuestions,
            attemptedQuestions: attemptedQuestions || totalQuestions,
            correctAnswers,
            wrongAnswers,
            score,
            completionTime:     completionTime || 0,
            submittedAt:        new Date(),
        });

        // 4. Leaderboard upsert (best score only)
        const lb = await Leaderboard.findOne({ userId });
        if (!lb || score > lb.score || (score === lb.score && (completionTime||0) < lb.completionTime)) {
            await Leaderboard.findOneAndUpdate(
                { userId },
                { userId, name:user.name, dept:user.dept, year:user.year,
                  score, completionTime:completionTime||0, submittedAt:new Date(), updatedAt:new Date() },
                { upsert:true, new:true }
            );
            await recalculateRanks();
        }

        // 5. Certificate — workout + score >= 60 only
        let certificate = null;
        const isWorkout = (mode === "workout");

        if (isWorkout && score >= 60) {
            // Avoid duplicate per attempt
            const exists = await Certificate.findOne({ assessmentAttemptId: attempt._id });

            if (exists) {
                certificate = exists;
            } else {
                const assessmentName = assessmentType === "aptitude"
                    ? "Aptitude Assessment"
                    : "DSA Coding Assessment";

                certificate = await Certificate.create({
                    userId,
                    assessmentAttemptId: attempt._id,
                    assessmentType,
                    userName:       user.name,
                    rollNo:         user.rollNo  || "",
                    dept:           user.dept    || "",
                    year:           user.year    || "",
                    assessmentName,
                    score,
                    grade:          computeGrade(score),
                    issueDate:      new Date(),
                });
            }
        }

        console.log(`✅ Submit: score=${score} mode=${mode} workout=${isWorkout} cert=${certificate?._id || "none"}`);

        // 6. Respond
        return res.status(200).json({
            success:   true,
            message:   "Assessment submitted successfully!",
            attemptId: attempt._id,
            score,
            grade:     computeGrade(score),
            certificate: certificate ? {
                id:             certificate._id,
                grade:          certificate.grade,
                assessmentName: certificate.assessmentName,
                score:          certificate.score,
                issueDate:      certificate.issueDate,
                dept:           certificate.dept   || "",
                year:           certificate.year   || "",
                userName:       certificate.userName || user.name,
                rollNo:         certificate.rollNo  || "",
            } : null,
        });

    } catch (err) {
        console.error("❌ submitAssessment error:", err);
        return res.status(500).json({ message: "Server error during submission" });
    }
};

/* =================================================
   GET /api/leaderboard
================================================= */
exports.getLeaderboardRanked = async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find({})
            .sort({ score:-1, completionTime:1, submittedAt:1 })
            .lean();

        const ranked = leaderboard.map((e, i) => ({
            rank:           e.rank || i+1,
            name:           e.name,
            dept:           e.dept,
            year:           e.year,
            score:          e.score,
            completionTime: e.completionTime,
            userId:         e.userId,
        }));

        return res.json(ranked);
    } catch (err) {
        console.error("❌ getLeaderboardRanked error:", err);
        return res.status(500).json({ message: "Failed to load leaderboard" });
    }
};

/* =================================================
   GET /api/dashboard/:userId
================================================= */
exports.getDashboard = async (req, res) => {
    try {
        const { userId } = req.params;
        const attempts = await AssessmentAttempt.find({ userId }).sort({ submittedAt:-1 }).lean();

        const totalAttempts = attempts.length;
        const avgScore  = totalAttempts ? Math.round(attempts.reduce((s,a)=>s+a.score,0)/totalAttempts) : 0;
        const bestScore = totalAttempts ? Math.max(...attempts.map(a=>a.score)) : 0;
        const lbEntry   = await Leaderboard.findOne({ userId }).lean();

        return res.json({
            totalAttempts, avgScore, bestScore,
            rank:           lbEntry ? lbEntry.rank : null,
            recentAttempts: attempts.slice(0,5).map(a => ({
                id:a._id, assessmentType:a.assessmentType, score:a.score,
                correctAnswers:a.correctAnswers, totalQuestions:a.totalQuestions,
                completionTime:a.completionTime, submittedAt:a.submittedAt
            })),
        });
    } catch (err) {
        console.error("❌ getDashboard error:", err);
        return res.status(500).json({ message: "Failed to load dashboard" });
    }
};

/* =================================================
   GET /api/attempts/:userId
================================================= */
exports.getAttempts = async (req, res) => {
    try {
        const { userId } = req.params;
        const attempts = await AssessmentAttempt.find({ userId }).sort({ submittedAt:-1 }).lean();
        return res.json({ success:true, attempts });
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch attempts" });
    }
};

/* =================================================
   GET /api/results/:attemptId
================================================= */
exports.getResultById = async (req, res) => {
    try {
        const attempt = await AssessmentAttempt.findById(req.params.attemptId).lean();
        if (!attempt) return res.status(404).json({ message: "Attempt not found" });
        return res.json({ success:true, result:{ ...attempt, grade:computeGrade(attempt.score) } });
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch result" });
    }
};

/* =================================================
   GET /api/certificate/:userId
================================================= */
exports.getCertificate = async (req, res) => {
    try {
        const { userId } = req.params;
        const certs = await Certificate.find({ userId }).sort({ issueDate:-1 }).lean();

        const mapped = certs.map(c => ({
            _id:            c._id,
            assessmentType: c.assessmentType,
            userName:       c.userName,
            rollNo:         c.rollNo,
            dept:           c.dept,
            year:           c.year,
            assessmentName: c.assessmentName,
            score:          c.score,
            grade:          c.grade,
            issueDate:      c.issueDate,
        }));

        return res.json({ success:true, certificates:mapped });
    } catch (err) {
        console.error("❌ getCertificate error:", err);
        return res.status(500).json({ message: "Failed to fetch certificates" });
    }
};
