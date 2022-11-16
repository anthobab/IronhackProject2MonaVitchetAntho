const router = require("express").Router();
const User = require("../models/User.model");
const Match = require("../models/Match.model");

/* GET home page */

router.get("/findAllUsers", async (req, res, next) => {
  const excluded = [];

  //const userFound = await Match.find({ date: yes });

  const filter = {
    availableDates: {
      $elemMatch: {
        $gte: new Date("16 Nov 2022 00:00:00 GMT"),
        $lte: new Date("17 Nov 2022 00:00:00 GMT"),
      },
    },
  };

  const limit = 5;
  const projection = {};

  const users = await User.find(filter, projection, { limit });
  //   console.log("begin \n \n", users, "end \n \n end");
  //   const userFound = await User.findById(users[0]);
  res.json({ users });
});

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
