const router = require("express").Router();
const User = require("../models/User.model");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

///////////////////////////////////
// TO ACCESS PAGE LOG IN //

router.get("/auth/login", (req, res) => {
  res.render("auth/login");
});

// ROUTE LOG IN //

router.post("/login", async (req, res) => {
  console.log("SESSION =====> ", req.session);
  const { password, usernameOrEmail } = req.body;
  try {
    const user =
      (await User.findOne({ email: usernameOrEmail })) ||
      (await User.findOne({ username: usernameOrEmail }));
    console.log(user, "test");
    const newHash = SHA256(password + user.salt).toString(encBase64);
    if (!user) {
      res.render("auth/login", {
        errorMessage: "L'email n'existe pas",
      });
    } else if (newHash !== user.hash) {
      res.render("auth/login", {
        errorMessage: "Le mots de passe est invalide",
      });
    } else {
      req.session.currentUser = user;
      res.redirect("/");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
