const User = require("../models/User.js");

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  return res.json(user);
};
