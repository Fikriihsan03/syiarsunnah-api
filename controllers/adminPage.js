const adminPageAuth = (req, res, loginData) => {
  const role = loginData[1];
  if (role !== "admin") {
    return res.redirect("/blogForm");
  }
  res.render("adminPage", { role: "admin" });
};

const handlePostAdminPage = (req, res, db, bcrypt) => {
  const { username, password, role } = req.body;
  if (!password || !username || !role) {
    return res.status(404).json("please fill all form correctly");
  } else {
    const saltRounds = 12;
    bcrypt.hash(password, saltRounds, function (err, hash) {
      const postBlogData = `INSERT INTO user SET username = '${username}' ,password = '${hash}' ,role = '${role}' `;
      db.query(postBlogData, function (error, result) {
        if (error) res.status(500).json("SQL bermasalah");
        return res.status(201).json("post user data success");
      });
    });
  }
};

const handleDeleteBlogData = (req, res, db) => {
  const { id } = req.body;
  const deleteQuery = `DELETE FROM blog_data WHERE blog_data.id = ${id}`;
  db.query(deleteQuery, function (err, result) {
    if (err) res.status(500).json("query bermasalah");
    return res.status(200).json("Success to Delete blog Data");
  });
};
module.exports = {
  adminPageAuth: adminPageAuth,
  handlePostAdminPage: handlePostAdminPage,
  handleDeleteBlogData: handleDeleteBlogData,
};
