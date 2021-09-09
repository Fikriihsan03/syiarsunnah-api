const adminPageAuth = (req, res, loginData) => {
  const role = loginData[1];
  if (role !== "admin") {
    return res.redirect("/blogForm");
  }
  res.render("adminPage");
};
module.exports = { adminPageAuth: adminPageAuth };
