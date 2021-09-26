const getForm = (req, res, loginData) => {
  const author = req.session.author;
  const role = req.session.role;

  res.render("form", { authorName: author, role: role });
  // form.ejs ada di folder views
};

module.exports = { getForm: getForm };
