const inquirer = require("inquirer");
const mysql = require("mysql");

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employeesdb'
});

con.connect(function(err){
    if (err) {
        console.error(err);
        return ;
    }
    //successful connection
    //this won't run if you have an error
    console.log("success!");
    let queryTxt = "select from employees"
    con.query(queryTxt, function(error, result) {
        //console logs data (dont actually have data yet)
        console.log(result)
    });
    //action();
});

// function action() {
//     inquirer.prompt([
//         {
//             type: "list",
//             name: "action",
//             message: "What would you like to do?",
//             choices: [
//                 "View all employees",
//                 "View all employees by department",
//                 "View all employees by manager",
//                 "Add Employee",
//                 "Remove employee",
//                 "Update employee role",
                // "Update manager role"
//             ]
//         }
//     ]).then(qry_txt => {
//         console.log(qry_txt)
//         if (qry_txt === "View all employees") {
//             viewEmployees()
//         } if (qry_txt === "View all employees by department") {
//             viewEmployeesDepartment()
//         } if (qry_txt === "View all employees by manager") {
//             viewMangers()
//         } if (qry_txt === "Add Employee") {
//             addEmployees()
//         } if (qry_txt === "Remove employee") {
//             removeEmployees()
//         } else {
//             UpdateEmployees()
//         }
//     });
    // if view all employees, display all employee data 
    // if view all employees by department
    // -- prompt department selection
    // if view all employees by manager
    // -- display manager list
    // if add

    //.then(qry_text =>{
    //    console.log(qry_text);
    //    con.query(qry_text,function(err,result){
    //        console.log(result);
    //    })
    //    con.end();
// }

// function viewEmployees() {
//     console.log("clicked")
// }