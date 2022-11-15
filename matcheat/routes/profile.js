const router = require("express").Router();
const User = require("../models/User.model");
const { exposeUserToView } = require("../middlewares/auth.js");
const uploader = require("./../config/cloudinary");

// SEND INFORMATION USER LOGIN //

router.get("/profile", exposeUserToView, async (req, res) => {
  userSession = req.session.currentUser;
  const user = await User.find(userSession);
  res.render("profile", { user });
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
    console.log(req.file);
    try {
      await FileModel.create({
        name: req.file.originalname,
        URL: req.file.path,
      });
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
      req.session.currentUser = userUpdate;
      await userUpdate.save();
      res.redirect("/");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
