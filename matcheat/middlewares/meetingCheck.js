const router = require("express").Router();
const User = require("../models/User.model");
const Match = require("../models/Match.model");
const Meeting = require("../models/Meetings.model");
const mongoose = require(mongoose);
const userId = res.locals.currentUser._id;
const filterUserMatcher = [{ $match: { matcher: userId } }];
const filterUserMatchee = [{ $match: { matchee: userId } }];
const userAsMatchee = Match.find(filterUserMatchee);
const userAsMatcher = Match.find(filterUserMatcher);
Match.find(filterUserMatchee).forEach((el) => {
  tempMatcher = el.matcher;
});
Match.find(filterUserMatchee).forEach((el) => {
  tempMatchee = el.matchee;
});

console.log(userAsMatcher);

async function checkMatch(req, res, next) {
  const { id } = req.params;

  const newMatch = await Match.create({
    matcher: userId,
    matchee: id,
  });
  const itsAMatch = await Match.findOne({ matcher: id, matchee: userId });
  if (itsAMatch) {
    const newMeeting = await Meeting.create({
      users: [id, userId],
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
  // const checkTheMatcher = await Match.find(filterUserMatchee).
  // checkTheMatcher.forEach((cheeList) => {
  //   if(Match.find([{ $match: { matcher: userId } }]).matchee ===
  //   )
  // });

  //   next();
}

module.exports = {
  checkMatch,
};
