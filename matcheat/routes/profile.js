const router = require("express").Router();
const User = require("../models/User.model");
const { exposeUserToView, isLoggedOut } = require("../middlewares/auth.js");
const uploader = require("./../config/cloudinary");

// SEND INFORMATION USER LOGIN //

router.get("/profile", exposeUserToView, async (req, res) => {
  try {
    userSession = req.session.currentUser;
    const user = await User.findById(userSession._id);
    res.render("profile", { user: [user] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// CATCH NEWS INFORMATIONS AND UPDATE USER //

router.post(
  "/profile",
  uploader.single("picture"),
  exposeUserToView,
  async (req, res) => {
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
      let userUpdate;
      if (req.file) {
        userUpdate = await User.findByIdAndUpdate(
          userSession._id,
          {
            username,
            email,
            firstName,
            lastName,
            address: { city, street, postcode },
            phone: { prefix, number },
            age,
            image: {
              name: req.file.originalname,
              url: req.file.path,
            },
          },
          { new: true }
        );
      } else {
        userUpdate = await User.findByIdAndUpdate(
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
      }

      req.session.currentUser = userUpdate;
      await userUpdate.save();
      res.redirect("/");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.get("/delete", exposeUserToView, async (req, res) => {
  res.render("delete");
});

router.post("/delete", async (req, res, next) => {
  userSession = req.session.currentUser;
  console.log(userSession);
  try {
    await User.findByIdAndRemove(userSession._id);
    await req.session.destroy();
    res.redirect("/");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
