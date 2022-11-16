const router = require("express").Router();
const User = require("../models/User.model");
const Match = require("../models/Match.model");

//To access Match-list page//

router.get("/all-matchs", async (req, res) => {
  const userId = req.session.currentUser;
  console.log(userId);
  const filteredMatchs = await Match.find({
    $or: [{ matcher: userId }, { matchee: userId }],
  });
  console.log(filteredMatchs);
  res.render("all-matchs", { allMatchs: filteredMatchs });
});

module.exports = router;
