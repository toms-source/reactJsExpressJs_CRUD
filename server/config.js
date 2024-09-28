const mysql = require("mysql");

const database = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "basiccrud"
})

database.connect((err) => {
    if(err) {
        console.err("Connection error!");
    return;
    }
    console.log("Connected!");


})


module.exports = database;