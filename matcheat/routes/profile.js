const router = require("express").Router();
const User = require("../models/User.model");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth.js");

router.get("/profile", async (req, res) => {
  userSession = req.session.currentUser;
  const user = await User.find(userSession);
  console.log(user);
  res.render("profile", { user });
});

module.exports = router;
