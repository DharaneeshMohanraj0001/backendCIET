const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware.js");
const { getMe } = require("../controllers/user.controller.js");

router.get("/me", auth, getMe);

module.exports = router;
