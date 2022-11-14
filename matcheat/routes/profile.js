const router = require("express").Router();
const User = require("../models/User.model");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth.js");

router.get("/profile", (req, res) => {
  (userSession = req.session.currentUser), res.render("profile", userSession);
});

module.exports = router;
