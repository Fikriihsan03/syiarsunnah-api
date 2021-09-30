let loginData = [null, null];

const handleSignIn = (req, res, db, bcrypt) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.send("Mohon isi form login dengan benar");
  }
  const getUser = "SELECT * FROM user WHERE BINARY username = ? ";
  db.query(getUser, [username], function (error, result) {

    if (result.length === 0) {
      return res.json("username anda salah");
    } else {
      const isValid = bcrypt.compareSync(password, result[0].password);
      if (isValid) {
        req.session.author = result[0].username;
        req.session.role =result[0].role;
        req.session.isAuth = true;
        return res.status(200).redirect("/blogForm");
      } else {
        return res.json("Password anda salah");
      }
    }
  });
};
module.exports = { data: loginData, handleSignIn: handleSignIn };
