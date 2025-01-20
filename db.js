const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables from .env

// Create a connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "users"
});

connection.connect((err) => {
  if (err) {
    console.error("Failed to connect:", err.message);
  } else {
    console.log("Connected to MySQL..!");
 }
});

module.exports = connection;

const select_query = 'SELECT * FROM users'
connection.query(select_query,(err,result) => {
if (err) {
  console.error(err);
} else {
  console.log(result);
}
});