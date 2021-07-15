var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "fimarasa",
  database: "syiarsunnah",
});
module.exports = connection;
