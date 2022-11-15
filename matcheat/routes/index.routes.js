const express = require("express");
const { exposeUserToView } = require("../middlewares/auth");
const router = express.Router();

/* GET home page */
router.get("/", exposeUserToView, (req, res, next) => {
  res.render("index");
});

module.exports = router;
