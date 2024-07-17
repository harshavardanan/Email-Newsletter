const mysql = require("mysql2");
const { bgMagneta } = require("consoleartist");
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect(function (err) {
  if (err) throw err;
  console.log(bgMagneta(`Database connected to host: ${process.env.HOST}`));
});

module.exports = db;
