const express = require("express");
const router = express.Router();
const loginData = require("./login");

router.get("/adminPage", (req, res, next) => {
  const role = loginData.data[1];
  console.log(role);
  if (role !== "admin") {
    return res.redirect("/blogForm");
  }
  res.render("adminPage");
  // form.ejs ada di folder views
});
module.exports = router;
