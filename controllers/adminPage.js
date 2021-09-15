const adminPageAuth = (req, res, loginData) => {
  const role = loginData[1];
  if (role !== "admin") {
    return res.redirect("/blogForm");
  }
  res.render("adminPage");
};
const handlePostAdminPage = (req,res,db,bcrypt)=>{
  const {username,password,role} = req.body;
  if (!password || !username || !role ) {
    return res.status(404).json("please fill all form correctly");
  }else{
    const saltRounds = 12;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      const postBlogData = `INSERT INTO user SET username = '${username}' ,password = '${hash}' ,role = '${role}' `;
      db.query(postBlogData, function (error, result) {
        if (error) res.status(500).json("SQL bermasalah");
        return res.status(201).json("post user data success");
      });
    });

  }
}
module.exports = { adminPageAuth: adminPageAuth,handlePostAdminPage:handlePostAdminPage };
