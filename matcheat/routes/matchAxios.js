const router = require("express").Router();
const User = require("../models/User.model");
const Match = require("../models/Match.model");
const Meeting = require("../models/Meetings.model");
const mongoose = require("mongoose");

// import { ObjectId } from "mongodb";
/* GET findAllUsers */
// each Users except me
// which

router.get("/findAllUsers", async (req, res, next) => {
  const excluded = [];

  //const userDate = req.session.currentUser;
  //const filteredDate = await Match.find({ availableDates: userDate });

  const filterAvailableUsers = {
    availableDates: {
      $elemMatch: {
        $gte: new Date(" 16 Nov 2022 00:00:00 GMT"),
        $lte: new Date(" 17 Nov 2022 00:00:00 GMT"),
      },
    },
  };
  //add my Id
  const UserId = new mongoose.Types.ObjectId(res.locals.currentUser._id);
  // const excludesUsersId = [res.locals.currentUser._id];

  const excludesUsersId = [UserId];

  // *************************************************************
  console.log(UserId);
  const aggMatches = [
    {
      $match: {
        matcher: UserId,
      },
    },
    {
      $replaceWith: {
        excludeUser: "$matchee",
      },
    },
  ];

  const result = await Match.aggregate(aggMatches);
  console.log(result);

  result.forEach((objId) => {
    excludesUsersId.push(objId.excludeUser);
  });
  console.log(excludesUsersId);

  // **********************************************************
  const filterMeeting = {
    availableDates: {
      $elemMatch: {
        $gte: new Date(" 16 Nov 2022 00:00:00 GMT"),
        $lte: new Date(" 17 Nov 2022 00:00:00 GMT"),
      },
    },
  };
  // *****

  const filterUsers = {
    availableDates: {
      $elemMatch: {
        $gte: new Date(" 16 Nov 2022 00:00:00 GMT"),
        $lte: new Date(" 17 Nov 2022 00:00:00 GMT"),
      },
    },
    _id: { $nin: excludesUsersId },
    // matchee: null,
  };

  //const limit = 5;
  const projection = {
    image: 1,
    username: 1,
    firstName: 1,
    lastName: 1,
    age: 1,
  };

  // const users = (
  //   await Match.find(filter)
  //     .limit(5)
  //     .populate(
  //       "matcher matchee",
  //       "-hash -address -phone -availableDates -salt"
  //     )
  // ).map((match) => match.matcher);

  //   console.log("begin \n \n", users, "end \n \n end");
  //   const userFound = await User.findById(users[0]);
  //res.json({ users });
  // console.log(users);

  const users = await User.find(filterUsers);
  // .projection({
  //   image: 1,
  //   username: 1,
  //   firstName: 1,
  //   lastName: 1,
  //   age: 1,
  // });

  res.json(users);
});

router.post("/createMatch", async (req, res, next) => {
  const userId = res.locals.currentUser._id;

  // console.log("\n\n req.param : ", req.body, req.params, "\n\n");
  const { matchee, date } = req.body;

  console.log("\n\n Date : ", date, "\n\n");
  const newMatch = await Match.create({
    matcher: userId,
    matchee: matchee,
    date: new Date(date),
  });

  const itsAMatch = await Match.findOne({ matcher: matchee, matchee: userId });
  if (itsAMatch) {
    const newMeeting = await Meeting.create({
      users: [matchee, userId],
      date: new Date(date),
    });
    return res.json({
      status: "Meeting",
      data: newMeeting,
    });
  }
  res.json({
    status: "Match",
    data: newMatch,
  });
});

// router.post("/message", (req, res, next) => {
//   console.log(req.body);
//   res.json({ msg: "all good" });
// });

module.exports = router;
