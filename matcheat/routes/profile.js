const router = require("express").Router();
const User = require("../models/User.model");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth.js");

// SEND INFORMATION USER LOGIN //

router.get("/profile", async (req, res) => {
  userSession = req.session.currentUser;
  const user = await User.find(userSession);
  res.render("profile", { user });
});

// CATCH NEWS INFORMATIONS AND UPDATE USER //

router.post("/profile", async (req, res) => {
  userSession = req.session.currentUser;
  const {
    firstName,
    lastName,
    street,
    city,
    postcode,
    username,
    email,
    prefix,
    number,
    age,
  } = req.body;
  try {
    const userUpdate = await User.findByIdAndUpdate(
      userSession._id,
      {
        username,
        email,
        firstName,
        lastName,
        address: { city, street, postcode },
        phone: { prefix, number },
        age,
      },
      { new: true }
    );
    console.log(userUpdate);
    await userUpdate.save();

    res.render("index");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
