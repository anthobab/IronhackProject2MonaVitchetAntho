const router = require("express").Router();
const User = require("../models/User.model");
const Match = require("../models/Match.model");
const Meeting = require("../models/Meetings.model");
//To access Match-list page//

router.get("/all-matchs", async (req, res) => {
  const userId = req.session.currentUser;
  console.log(userId);
  const filteredMatchs = await Meeting.find({
    $or: [{ matcher: userId }, { matchee: userId }],
  }).populate("users");
  console.log(filteredMatchs);
  console.log(filteredMatchs[0].users);
  res.render("all-matchs", { allMatchs: filteredMatchs });
});

module.exports = router;
