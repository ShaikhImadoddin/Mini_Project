const express = require("express");
const app = express();
const mysql = require('mysql2');
const path = require("path");

// Use dynamic port if available (Render), else fallback to 8080 (local)
const PORT = process.env.PORT || 8080;

//for ejs
app.set("views", path.join(__dirname, "views"));// Set views folder
app.set("view engine", "ejs");// Set view engine

//for styling Serve static files from public folder
app.use(express.static(path.join(__dirname, "/public")));

// Create a connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'sql_app'
});

// Home route
app.get("/",(req, res) => {
  let q = `SELECT count(*) FROM user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs",{count});
    });
  } catch (err) {
    console.log(err);
    res.send("Some Error in DB");
  }
});

// show all users route
app.get("/users", (req,res) => {
  let q = `SELECT id,username,email FROM user`;
  try{
    connection.query(q, (err, result) => {
      if (err) throw err;
      let users = result;
      res.render("showusers.ejs",{users});
    })
  } catch (err){
    console.log(err);
    res.send("Some Error in DB");
  }
});

app.listen(PORT, () => {
  console.log("Server is Listening to Port 8080");
});





