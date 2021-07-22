const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  return next();
});

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

const blogForm = require("./routes/blogForm");
const blogData = require("./routes/blogData");
const loginForm = require("./routes/login");

app.use(loginForm.router);
app.use(blogForm);
app.use(blogData);

app.listen(3001, () => {
  console.log("server.js running on port 3001");
});
