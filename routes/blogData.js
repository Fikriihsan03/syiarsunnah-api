const express = require("express");
const router = express.Router();
const db = require("../db");
const loginData = require("./login");

router.get("/blogData/:id", (req, res, next) => {
  const { id } = req.params;
  db.query(`SELECT * FROM blog_data WHERE id=${id} `, function (err, result) {
    if (err) console.log("masalah ada di blogData dengan req param method GET");
    res.json(result);
  });
});
router.get("/blogData", (req, res, next) => {
  db.query("SELECT * FROM blog_data", function (err, result) {
    if (err) console.log("masalah ada di blogData method GET");
    res.json(result);
  });
});
router.post("/blogData", (req, res, next) => {
  const { inputFile, title, subTitle, content } = req.body;
  const date = new Date().toISOString().slice(0, 10).split("-").join("-");
  const author = loginData.data[0];
  const postBlogData = `INSERT INTO blog_data SET date = '${date}' ,author = '${author}' ,image = '${inputFile}' ,title='${title}' ,sub_title='${subTitle}' ,content='${content}'`;
  if (!inputFile || !title || !subTitle || !content) {
    return res.json("please fill all form correctly");
  }
  db.query(postBlogData, function (error, result) {
    if (error) throw error;
    return res.status(200).json("post blog data success");
  });
});
module.exports = router;
