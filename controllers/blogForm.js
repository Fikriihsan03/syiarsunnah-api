const getForm = (req, res, loginData) => {
  console.log(loginData);
  const author = loginData[0];
  const role = loginData[1];
  if (author === null) {
    return res.redirect("/");
  }
  res.render("form", { authorName: author, role: role });
  // form.ejs ada di folder views
};

module.exports = { getForm: getForm };
