const express = require("express");
const router = express.Router();

// const data = [];
// router.get("/blogData", (req, res, next) => {
//   res.render("index");
// });
router.post("/blogData", (req, res, next) => {
  //   console.log(title);
  //   console.log(inputFile);
  res.json(req.body.content);
});
module.exports = router;