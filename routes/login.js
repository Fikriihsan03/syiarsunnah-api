const express = require("express");
const router = express.Router();

const loginData = [null];
router.get("/", (req, res, next) => {
  res.render("login");
  // login.ejs ada di folder views
});

router.post("/", (req, res, next) => {
  if (req.body.username === "sad" && req.body.password === "admin") {
    loginData.splice(0, 1, req.body.username);
    // loginData.push(req.body.username);
    res.redirect("/blogForm");
  }
  // res.json("Failed");
});
module.exports = { router: router, username: loginData };
