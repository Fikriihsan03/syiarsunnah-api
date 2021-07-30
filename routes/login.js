const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

const loginData = [null];
router.get("/", (req, res, next) => {
  res.render("login");
  // login.ejs ada di folder views
});

router.post("/", (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.send("Mohon isi form login dengan benar");
  }
  const getUser = "SELECT * FROM user WHERE username = ? ";
  db.query(getUser, [username], function (error, result) {
    if (result.length === 0) {
      return res.json("username anda salah");
    } else {
      const isValid = bcrypt.compareSync(password, result[0].password);
      if (isValid) {
        loginData.splice(0, 1, result[0].username);
        return res.status(200).redirect("/blogForm");
      } else {
        res.json("Password anda salah");
      }
    }
  });
});
module.exports = { router: router, data: loginData };
