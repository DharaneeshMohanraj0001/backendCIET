// controllers/question.controller.js

// Import question banks
const aptitude = require("../data/aptitude.js");
const dsa = require("../data/dsa.js");

// GET QUESTIONS API
const getQuestions = async (req, res) => {
  try {

    // Get skill from query
    const { skill } = req.query;

    // Check if skill provided
    if (!skill) {
      return res.status(400).json({
        message: "Skill is required (aptitude or dsa)"
      });
    }

    // If skill = aptitude
    if (skill === "aptitude") {

      if (!aptitude || aptitude.length === 0) {
        return res.status(404).json({
          message: "No aptitude questions found"
        });
      }

      return res.status(200).json({
        skill: "aptitude",
        total: aptitude.length,
        questions: aptitude
      });
    }

    // If skill = dsa
    if (skill === "dsa") {

      if (!dsa || dsa.length === 0) {
        return res.status(404).json({
          message: "No DSA questions found"
        });
      }

      return res.status(200).json({
        skill: "dsa",
        total: dsa.length,
        questions: dsa
      });
    }

    // Invalid skill
    return res.status(400).json({
      message: "Invalid skill. Use aptitude or dsa"
    });

  } catch (error) {

    console.error("Error fetching questions:", error);

    return res.status(500).json({
      message: "Server error while fetching questions",
      error: error.message
    });

  }
};

// Export controller
module.exports = {
  getQuestions
};
