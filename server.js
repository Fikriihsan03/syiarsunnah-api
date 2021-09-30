const express = require("express");
const path = require("path");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");
const session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);


const app = express();
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
var options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "fimarasa",
  database: "syiarsunnah",
};

var sessionStore = new MySQLStore(options);
app.use(
  session({
    key: "session_cookie_name",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

const blogForm = require("./controllers/blogForm");
const blogData = require("./controllers/blogData");
const adminPage = require("./controllers/adminPage");
const loginForm = require("./controllers/login");

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    return res.redirect("/");
  }
};

app.get("/", (req, res, next) => {
  res.render("login");
});
app.post("/", (req, res) => {
  loginForm.handleSignIn(req, res, db, bcrypt);
});
//-------blogForm route------------
app.get("/blogForm", isAuth, (req, res) => {
  blogForm.getForm(req, res, loginForm.data);
});
//------------adminPage route
app.get("/adminPage", (req, res) => {
  adminPage.adminPageAuth(req, res, loginForm.data);
});
app.post("/adminPage", (req, res) => {
  adminPage.handlePostAdminPage(req, res, db, bcrypt);
});
app.delete("/adminPage", (req, res) => {
  adminPage.handleDeleteBlogData(req, res, db);
});
//----------blogData route---------
app.get("/blogData", (req, res) => {
  blogData.getAllBlogData(req, res, db);
});
app.get("/blogData/:category", (req, res) => {
  blogData.getBlogDataWithCategory(req, res, db);
});
app.post("/blogData", (req, res) => {
  blogData.handlePostBlogData(req, res, db, loginForm.data);
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
});

app.listen(3001, () => {
  console.log("server.js running on port 3001");
});
