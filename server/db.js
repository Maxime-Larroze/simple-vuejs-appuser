"user strict";
const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
connection.connect(function(err, res) {
  try {
    if (err)
      console.log(
        "Impossible de joindre la base de données. [" +
          process.env.DB_HOST +
          ":" +
          process.env.DB_PORT +
          "] merci de réessayer ultérieurement."
      );
  } catch (err) {
    return console.log("Impossible de joindre la base de données: " + err);
  }
});
module.exports = connection;
