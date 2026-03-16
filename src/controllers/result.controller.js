const Attempt = require("../models/Attempt");

/*************************************************
 * GET USER RESULT
 *************************************************/

exports.getResult = async (req, res) => {
  try {

    const userId = req.user.id;

    const attempts = await Attempt.find({ userId });

    const totalQuestions = attempts.length;

    const correctAnswers = attempts.filter(a => a.isCorrect).length;

    const wrongAnswers = totalQuestions - correctAnswers;

    const score = correctAnswers * 10;

    res.json({
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      score
    });

  } catch (err) {

    res.status(500).json({
      message: "Failed to calculate result"
    });

  }
};


/*************************************************
 * LEADERBOARD
 *************************************************/


exports.getLeaderboard = async (req, res) => {
  try {

    const leaderboard = await Attempt.aggregate([

      // Group attempts by user
      {
        $group: {
          _id: "$userId",
          totalAttempts: { $sum: 1 },
          correct: {
            $sum: { $cond: ["$isCorrect", 1, 0] }
          }
        }
      },

      // Calculate score
      {
        $addFields: {
          score: { $multiply: ["$correct", 10] }
        }
      },

      // Join with users collection
      {
        $lookup: {
          from: "users",        // MongoDB collection name
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },

      // Flatten user array
      {
        $unwind: "$user"
      },

      // Select fields to send to frontend
      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: "$user.name",
          dept: "$user.dept",
          year: "$user.year",
          totalAttempts: 1,
          correct: 1,
          score: 1
        }
      },

      // Sort by score
      {
        $sort: { score: -1 }
      }

    ]);

    res.json(leaderboard);

  } catch (err) {

    console.error("Leaderboard error:", err);

    res.status(500).json({
      message: "Failed to load leaderboard"
    });

  }
};