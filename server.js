const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

const blogForm = require("./routes/blogForm");
const blogData = require("./routes/blogData");
const adminPage = require("./routes/adminPage");
const loginForm = require("./routes/login");

app.use(loginForm.router);
app.use(blogForm);
app.use(adminPage);
app.use(blogData);

app.listen(3001, () => {
  console.log("server.js running on port 3001");
});
