const mysql = require("mysql");
const inquirer = require("inquirer");

require('events').EventEmitter.defaultMaxListeners = 15;

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
            "View all departments",
            "View all roles",
            "Add employee",
            "Add department",
            "Add role",
            "Update employee roles",
        ]
    })
    .then(function(answer) {
        switch(answer.action) {
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

        for (var i = 0; i < result.length; i++) {
            console.table(
                "ID: " +
                result[i].id +
                " First Name: " +
                result[i].first_name +
                " Last Name " +
                result[i].last_name +
                " Role " +
                result[i].role_id +
                " Manager " +
                result[i].manager_id
            );
        }
        runPrompt();
    });
}

function allDept() {
    connection.query("SELECT * FROM department ORDER BY id", function(err, result) {
        if (err) throw err;

        for (var i = 0; i < result.length; i++) {
            console.table(
                "ID " +
                result[i].id +
                " Name " +
                result[i].deptName
            );
        }
        runPrompt();
    });
}

function allRoles() {
    connection.query("SELECT * FROM role ORDER BY id", function(err, result) {
        if (err) throw err;

        for (var i = 0; i < result.length; i++) {
            console.table(
                "ID: " +
                result[i].id +
                " Title: " +
                result[i].title +
                " Salary " +
                result[i].salary +
                " Department " +
                result[i].department_id
            );
        }
        runPrompt();
    });
}

//Add employee function

class Employee {
    constructor(id, first_name, last_name, role_id, manager_id) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }

    printInfo() {
        console.table(
            `ID: ${this.id}
            First Name: ${this.first_name}
            Last Name: ${this.last_name}
            Role: ${this.role_id}
            Manager: ${this.manager_id}`
        );
    }
}

function addEmployee() {
    dataAccessLayer.create([`name`], [`Test Department`], [`department`]); 
}