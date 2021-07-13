const express = require("express");
const router = express.Router();
const loginData = require("./login");

router.get("/blogForm", (req, res, next) => {
  const author = loginData.username;
  res.render("form", { authorName: author });
  // form.ejs ada di folder views
});
module.exports = router;
