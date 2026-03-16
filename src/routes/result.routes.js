const express = require("express");
const router = express.Router();

const resultController = require("../controllers/result.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, resultController.getResult);

router.get("/leaderboard", resultController.getLeaderboard);

module.exports = router;


