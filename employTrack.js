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
    inquirer
        .prompt({
            name: "role",
            type: "input",
            message: "What role would you like to search for?"
        })
        .then(function(answer) {
            var query = "SELECT role.id, role.title, role.salary, role.department_id FROM role";

            connection.query(query, [answer.role, answer.role], function (err, res) {
                console.log(res.length + " matches found!");
                for (var i = 0; i < res.length; i++) {
                    console.log(
                        "ID: " +
                        res[i].id +
                        " Title: " +
                        res[i].title +
                        " Salary: " +
                        res[i].salary +
                        " Department ID: " +
                        res[i].department_id
                    );
                }
            });
        });
}