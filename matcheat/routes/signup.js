const router = require("express").Router();
const User = require("../models/User.model");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

///////////////////////////////////
// TO ACCESS PAGE SIGN UP //

router.get("/auth/signup", (req, res) => {
  res.render("auth/signup");
});

// ROUTE SIGN UP //

router.post("/signup", async (req, res) => {
  const {
    username,
    email,
    password,
    lastName,
    firstName,
    prefix,
    number,
    city,
    postcode,
    age,
    street,
  } = req.body;
  try {
    //PASSWORD

    const salt = uid2(16);

    const hash = SHA256(password + salt).toString(encBase64);

    //
    const emailExist = await User.findOne({ email });
    const usernameExist = await User.findOne({ username });
    if (emailExist) {
      res.render("auth/signup", {
        errorMessage: "Le mail est déjà utilisé",
      });
    } else if (usernameExist) {
      res.render("auth/signup", {
        errorMessage: "Le pseudo est déjà utilisé",
      });
    } else {
      const newUser = new User({
        username: username,
        firstName: firstName,
        lastName: lastName,
        address: { city, postcode, street },
        phone: { prefix, number },
        age: age,
        email: email,
        hash: hash,
        salt: salt,
      });
      await newUser.save();
      res.locals.isLoggedIn = true;
      res.redirect("auth/login");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/auth/logout", async (req, res) => {
  try {
    await req.session.destroy();
  } catch (error) {}

  res.redirect("/");
});

module.exports = router;
