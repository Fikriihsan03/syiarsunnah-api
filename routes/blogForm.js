const express = require("express");
const router = express.Router();
const loginData = require("./login");

router.get("/blogForm", (req, res, next) => {
  const author = loginData.data[0];
  const role = loginData.data[1];
  if (author === undefined) {
    return res.redirect("/");
  }
  res.render("form", { authorName: author, role: role });
  // form.ejs ada di folder views
});
module.exports = router;
