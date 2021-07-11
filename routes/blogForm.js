const express = require("express");
const router = express.Router();

router.get("/blogForm", (req, res, next) => {
  res.render("form");
  // form.ejs ada di folder views
});
module.exports = router;
