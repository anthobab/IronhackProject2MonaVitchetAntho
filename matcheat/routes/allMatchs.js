const router = require("express").Router();
const User = require("../models/User.model");
const Match = require("../models/Match.model");
const Meeting = require("../models/Meetings.model");
const mongoose = require("mongoose");
//To access Match-list page//

router.get("/all-matchs", async (req, res) => {
  const userId = new mongoose.Types.ObjectId(res.locals.currentUser._id);
  console.log(userId);
  const filteredMatchs = await Meeting.find({
    users: {
      $in: [userId],
    },
  }).populate("users");
  console.log(filteredMatchs);
  console.log(filteredMatchs[0].users);
  filteredMatchs.forEach((meetingEl) => {
    meetingEl.users.map((userEl) => {
      //console.log(
      //  "\n\n\n compare",
      //  userEl.id,
      //  res.locals.currentUser._id,
      //  userEl.id === res.locals.currentUser._id
      //);
      userEl.isNotMe = userEl.id !== res.locals.currentUser._id;
      return userEl;
    });
  });

  console.log(filteredMatchs[0]);
  res.render("all-matchs", { allMatchs: filteredMatchs });
});

module.exports = router;
