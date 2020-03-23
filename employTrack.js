const mysql = require("mysql");
const inquirer = require("inquirer");
const dataAccessLayer = require("./dal.js");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Gu!tar92",
    database: "employeeTracker_db"
});

connection.connect(function (err) {
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
            "View all departments",
            "View all roles",
            "Add employee",
            "Add department",
            "Add role",
            "Update employee roles",
        ]
    })
        .then(function (answer) {
            switch (answer.action) {
                case "View all employees":
                    allEmployees();
                    break;

                case "View all departments":
                    allDept();
                    break;

                case "View all roles":
                    allRoles();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "Add department":
                    addDepartment();
                    break;

                case "Add role":
                    addRole();
                    break;

                case "Update employee roles":
                    updateEmployee();
                    break;
            }
        });
}

function allEmployees() {
    connection.query("SELECT * FROM employee ORDER BY first_name DESC", function (err, result) {
        if (err) throw err;
        console.table(result);
        runPrompt();
    });
}

function allDept() {
    connection.query("SELECT * FROM department ORDER BY id", function (err, result) {
        if (err) throw err;
        console.table(result);
        runPrompt();
    });
}

function allRoles() {
    connection.query("SELECT * FROM role ORDER BY id", function (err, result) {
        if (err) throw err;
        console.table(result);
        runPrompt();
    });
}

//Add employee function

function addEmployee() {
    dataAccessLayer.create(["first_name", "last_name", "role_id"], ["Geralt", "of Rivia", 5], ["employee"]);
}