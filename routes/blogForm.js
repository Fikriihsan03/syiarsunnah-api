const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index");
  // index.ejs ada di folder views
});
module.exports = router;
