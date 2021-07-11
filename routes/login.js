const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("login");
  // login.ejs ada di folder views
});

router.post("/", (req, res, next) => {
  console.log(req.body.username);
  res.json("success");
});
module.exports = router;
