const router = require("express").Router();
const User = require("../models/User.model");
const Match = require("../models/Match.model");

/* GET home page */

// router.get("/findUser", (req, res, next) => {
//   res.render("index");
// });

// router.get("/image", (req, res, next) => {
//   res.json({
//     image:
//       "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
//   });
// });

// router.post("/message", (req, res, next) => {
//   console.log(req.body);
//   res.json({ msg: "all good" });
// });

module.exports = router;
