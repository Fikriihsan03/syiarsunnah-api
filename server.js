const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

const blogForm = require("./controllers/blogForm");
const blogData = require("./controllers/blogData");
const adminPage = require("./controllers/adminPage");
const loginForm = require("./controllers/login");

app.get("/", (req, res, next) => {
  res.render("login");
  // login.ejs ada di folder views
});
app.post("/", (req, res) => {
  loginForm.handleSignIn(req, res, db, bcrypt);
});

app.get("/blogForm", (req, res) => {
  blogForm.getForm(req, res, loginForm.data);
});
app.use("/adminPage", (req, res) => {
  adminPage.adminPageAuth(req, res, loginForm.data);
});

app.get("/blogData",(req,res)=>{blogData.getAllBlogData(req,res,db)})
app.get("/blogData/:category", (req, res,) => {blogData.getBlogDataWithCategory(req,res,db)});
app.post("/blogData",(req,res)=>{blogData.handlePostBlogData(req,res,db,loginForm.data)})

app.listen(3001, () => {
  console.log("server.js running on port 3001");
});
