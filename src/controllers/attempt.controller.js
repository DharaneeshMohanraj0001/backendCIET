const Attempt = require("../models/Attempt");

exports.saveAttempt = async (req, res) => {
  try {

    const userId = req.user.id;

    const { questionId, skill, isCorrect } = req.body;

    // Basic validation
    if (questionId === undefined || !skill) {
      return res.status(400).json({
        message: "questionId and skill are required"
      });
    }

    const attempt = new Attempt({
      userId,
      questionId,
      skill,
      isCorrect
    });

    await attempt.save();

    res.status(200).json({
      success: true,
      message: "Attempt saved"
    });

  } catch (err) {

    console.error("Attempt save error:", err);

    res.status(500).json({
      message: "Server error while saving attempt"
    });

  }
};