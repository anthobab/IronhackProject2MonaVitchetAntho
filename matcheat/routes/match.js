const router = require("express").Router();
const User = require("../models/User.model");
const Match = require("../models/Match.model");

//To access Match page//

router.get("/match", (req, res) => {
  res.render("match", { scripts: ["match.script.js"] });
});

module.exports = router;
