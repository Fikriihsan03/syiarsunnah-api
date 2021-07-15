const express = require("express");
const router = express.Router();
const loginData = require("./login");

router.get("/blogForm", (req, res, next) => {
  const author = loginData.data[0];
  if (author === null) {
    res.redirect("/");
  }
  res.render("form", { authorName: author });
  // form.ejs ada di folder views
});
module.exports = router;
