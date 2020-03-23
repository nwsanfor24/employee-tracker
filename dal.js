const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Gu!tar92",
    database: "employeeTracker_db"
});

connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
});

function questionmark(arryLen) {
    const arr = [];
    for (i = 0; i < arryLen; i++) {
      arr.push(`?`);
    }
    return arr.toString();    
}
function questionmarks(arryLen) {
    const arr = [];
    for (i = 0; i < arryLen; i++) {
      arr.push(`??`);
    }
    return arr.toString();    
}
// -------------------------------------------------------------
// Object for mySQL query pulls
// -------------------------------------------------------------
const dataAccessLayer = {
    select: function(cols, table, callback) {
        const query = `SELECT ${questionmarks(cols.length)} FROM ${questionmarks(table.length)}`;
        const params = [...cols, ...table];
        connection.query(query, params, function(err, res) {
            if (err) throw err;
            callback(res);
        });
    },
    create: function(cols, vals, table) {
        const query = `INSERT INTO ${questionmarks(table.length)} (${questionmarks(cols.length)}) VALUES (${questionmark(vals.length)})`;
        const params = [...table, ...cols, ...vals];
            connection.query(query, params, function(err, res) {
                if (err) throw err;
                console.log(`${vals} added to ${table}`);
                return res.insertId;
        });
    },
    update: function(cols, vals, table) {
        // NOT FINISHED
        const query = `UPDATE ${questionmarks(table.length)} SET ${questionmarks(cols.length)} = ${questionmark(vals.length)} WHERE`;
        const params = [...table, ...cols, ...vals];
        console.log(params);
        console.log(query);
        return new Promise((resolve, reject) => {
            connection.query(query, params, function(err, res) {
                if (err) throw err;
                return res.insertId;
            });
        });
    },
}

module.exports = dataAccessLayer;