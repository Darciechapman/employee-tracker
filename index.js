const inquirer = require("inquirer");
const mysql=require("mysql");
​
const con=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'songsdb'
});
​
con.connect(function(err){
    if (err) {
        console.error(err);
        return ;
    }
    //successful connection
    //this won't run if you have an error
    console.log("success!");
    action();
});
​
​
function action() {
    inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all employees by department",
          "View all employees by manager",
          "Add Employee",
          "Remove employee",
          "Update employee role",
          //"Update manager role"
        ]
      }
    ])}
    //.then(qry_text =>{
    //    console.log(qry_text);
    //    con.query(qry_text,function(err,result){
    //        console.log(result);
    //    })
    //    con.end();
    //}