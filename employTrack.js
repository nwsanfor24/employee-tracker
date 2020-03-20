const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Gu!tar92",
    database: "employeetracker_db"
});

connection.connect(function(err) {
    if (err) throw err;
    runPrompt();
});

