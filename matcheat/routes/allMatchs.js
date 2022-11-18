const router = require("express").Router();
const User = require("../models/User.model");
const Match = require("../models/Match.model");
const Meeting = require("../models/Meetings.model");
const mongoose = require("mongoose");
//To access Match-list page//

router.get("/all-matchs", async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(res.locals.currentUser._id);

    const filteredMatchs = await Meeting.find({
      users: {
        $in: [userId],
      },
    }).populate("users");

    filteredMatchs.forEach((meetingEl) => {
      meetingEl.users.map((userEl) => {
        userEl.isNotMe = userEl.id !== res.locals.currentUser._id;
        return userEl;
      });
    });

    console.log(filteredMatchs[0]);
    res.render("all-matchs", { allMatchs: filteredMatchs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
