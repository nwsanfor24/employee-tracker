const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Gu!tar92",
    database: "employeeTracker_db"
});

connection.connect(function(err) {
    if (err) throw err;
    runPrompt();
});

function runPrompt() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all employees by Department",
            "View all employees by Manager",
            "View all roles",
            "Add employee",
            "Remove employee",
            "Update employee roles",
        ]
    })
    .then(function(answer) {
        switch(answer.action) {
            case "View all employees":
                allEmployees();
                break;

            case "View all employees by Department":
                allEmByDept();
                break;

            case "View all employees by Manager":
                allEmByMan();
                break;

            case "View all roles":
                allRoles();
                break;

            case "Add employee":
                addEmployee();
                break;

            case "Remove employee":
                remEmployee();
                break;

            case "Update employee roles":
                updateEmployee();
                break;
        }
    });
}

function allEmployees() {
    inquirer.prompt({
        name: "id",
        type: "input",
        message: "Who would you like to search for?"
    })
    .then(function(answer) {
        var query = "SELECT first_name, last_name, role_id FROM employee WHERE ?";
        connection.query(query, { id: answer.id }, function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.table("First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name + " || Role: " + res[i].role);
            }
            runPrompt();
        });
    });
}

function allEmByDept() {
    inquirer.prompt({
        name: "role_id",
        type: "input",
        message: "Which department would you like to select?"
    })
    .then(function(answer) {
        var query = "SELECT "
    })
}