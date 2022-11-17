const router = require("express").Router();
const User = require("../models/User.model");
const Match = require("../models/Match.model");

function checkMatch(req, res, next) {
  if (true) {
    let filter = {
      matchee: req.session.currentUser._id,
      matcher: null,
    };
    let allMatchs = Match.find(filter);
    return null;
  }
  next();
}

module.exports = {
  checkMatch,
};
