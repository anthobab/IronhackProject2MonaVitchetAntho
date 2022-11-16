const router = require("express").Router();
const User = require("../models/User.model");
const Match = require("../models/Match.model");

function checkMatch(req, res, next) {
    if(***){
        let filter = {
            matchee: req.session.currentUser._id,
            matcher: 
        };
        let allMatchs = Match.find(filter);
        return res.
        
    }
     next()   
}

module.exports = {
  checkMatch,
};
