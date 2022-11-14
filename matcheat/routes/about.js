const router = require("express").Router();

//To access about page//

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
