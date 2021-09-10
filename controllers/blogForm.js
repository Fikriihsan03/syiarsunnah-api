const getForm = (req, res, loginData) => {
  const author = loginData[0];
  const role = loginData[1];

  res.render("form", { authorName: author, role: role });
  // form.ejs ada di folder views
};

module.exports = { getForm: getForm };
