const express = require("express");
const app = express();
const mysql = require('mysql2');
const path = require("path");
const methodOverride = require("method-override");
const { faker } = require('@faker-js/faker');


// Use dynamic port if available (Render), else fallback to 8080 (local)
const PORT = process.env.PORT || 8080;

//for ejs
app.set("views", path.join(__dirname, "views"));// Set views folder
app.set("view engine", "ejs");// Set view engine

//for styling Serve static files from public folder
app.use(express.static(path.join(__dirname, "/public")));

// Middleware to parse form data (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data (from APIs or Postman)
app.use(express.json());

// enable method override
app.use(methodOverride("_method"));

// Create a connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'sql_app'
});

// random user function
let getRandomUser = () =>{
  return[ 
    faker.datatype.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

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

// Show all users route
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

// Add user Page
app.get("/user/new", (req,res) => {
  res.render("Adduser.ejs");
});

// Add User data in Database
app.post("/user/new", (req,res) => {
  let generatedData = getRandomUser ();
  let id = String(generatedData[0]); 
  let {username, email, password} = req.body;
  let q3 = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
  try{
    connection.query(q3,[id, username, email, password] ,(err, result) => {
      if (err) {
        console.error("DB Insert Error:", err);
        return res.send("Error adding user");
      }
      console.log("Insert Success:", result);
      res.send(`
          <script>
            alert("User added successfully!");
            window.location.href = "/users";
          </script>
        `); 
      })
  } catch (err){
    console.log(err);
    res.send("Some Error in DB");
  }
});

// get delete form
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q, (err,result) => {
      if (err) throw err;
      let user = result[0];
      console.log(user.email);
      res.render("delete.ejs",{user});
    });
  }catch(err){
    res.send("some error with DB");
  }
});

// delete route
app.delete("/user/:id", (req,res) => {
    let {id} = req.params;
    let { userpassword } = req.body;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try{
      connection.query(q, (err,result) => {
        if (err) throw err;
        let user = result[0];

        if(user.password != userpassword){
          res.send("Wrong Password Entered");
        }
        else{
          let q2 = `DELETE FROM user WHERE id='${id}'`; //Query To Delete
            connection.query(q2, (err,result) => {
                if (err) throw err;
                else {
                  console.log(result);
                  console.log("deleted!");
                  res.send(`
                  <script>
                    alert("User Deleted successfully!");
                    window.location.href = "/users";
                  </script>
                `);
                }
            });
        }
      });
    } catch(err){
      res.send("Some Error with DB");
    }
});

// Edit Route
app.get("/user/:id/edit", (req,res) => {
    let {id} = req.params;
    let q = `SELECT * FROM user where id='${id}'`;
    try{
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result[0]);
      let data = result[0];
      res.render("edit.ejs",{data});
      })
    } catch (err){
      console.log(err);
      res.send("Some Error in DB");
    }    
});

// Update Route
app.patch("/user/:id", (req,res) => {
    let {id} = req.params;
    console.log(req.body);
    let {password: formPass, username: newUsername} = req.body;
    let q = `SELECT * FROM user where id='${id}'`;
    try{
      connection.query(q, (err, result) => {
        if (err) throw err;
        console.log(result[0]);
        let data = result[0];
        if(formPass != data.password){
          res.send("Wrong Password");
        }
        else{
          let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
          connection.query(q2, (err, result) => {
            if (err) throw err;
            res.redirect("/users");
          });
        }
      })
    } catch (err){
      console.log(err);
      res.send("Some Error in DB");
    } 
});

app.listen(PORT, () => {
  console.log("Server is Listening to Port 8080");
});





