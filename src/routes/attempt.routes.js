const express = require("express");
const router = express.Router();

const {saveAttempt} = require("../controllers/attempt.controller");
const auth = require("../middleware/auth.middleware");

router.post("/",auth,saveAttempt);

module.exports = router;