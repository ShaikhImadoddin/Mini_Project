const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

let getRandomUser = () =>{
  return[ 
    faker.datatype.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// Create a connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',     // your MySQL username
  password: '12345678',
  database: 'sql_app'
});

// Inserting New Data
let q = "INSERT INTO user (id,username,email,password) VALUES ?";

/*
let users = [
  ["101", "JohnDoe", "john@example.com", "John@1234"],
  ["102", "JaneDoe", "jane@example.com", "Jane@1234"],
  ["103", "AlexSmith", "alex@example.com", "Alex@1234"]
];
*/

let data =  [];
for(let i=1;i<=100;i++){
  data.push(getRandomUser());
}

// Connect to DB
try{
  connection.query(q, [data],(err, result) => {
    if (err) throw err;
    console.log(result);
  });
} catch(err){
   console.log(err);
}

connection.end();