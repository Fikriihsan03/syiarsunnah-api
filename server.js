const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.set("view engine", "ejs");

const blogForm = require("./routes/blogForm");

app.use(blogForm);

app.listen(3001, () => {
  console.log("server.js running on port 3001");
});
