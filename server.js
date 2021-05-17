const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

const blogForm = require("./routes/blogForm");
const blogData = require("./routes/blogData");

app.use(blogForm);
app.use(blogData);

app.listen(3001, () => {
  console.log("server.js running on port 3001");
});
