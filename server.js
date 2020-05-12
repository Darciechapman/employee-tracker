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
    //action();
})

con.query(
    "SELECT `first_name`, `last_name`, `title` as 'role' FROM employeesdb.employee inner join employeesdb.roles on(employee.role_id = roles.id);",
    function(error, result, fields) {
    //console logs data (dont actually have data yet)
    console.table(result)
    action()
});

function action() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all departments",
                "View all employees by manager",
                "Add Employee",
                "Remove employee",
                "Update employee role",
                //"Update manager role"
            ]
        }
    ]).then(({ action }) => {
        console.log(action)
        if (action === "View all employees") {
            viewEmployees()
        } else if (action === "View all departments") {
            viewDepartment()
        } else if (action === "View all employees by manager") {
            viewMangers()
        } else if (action === "Add Employee") {
            addEmployees()
        } else if (action === "Remove employee") {
            removeEmployees()
        } else {
            UpdateEmployees()
        }
    });
    // if view all employees, display all employee data 
    // if view all employees by department
    // -- prompt department selection
    // if view all employees by manager
    // -- display manager list
    // if add

}

function viewEmployees() {
    con.query(
        "SELECT `first_name`, `last_name`, `title` as 'role' FROM employeesdb.employee inner join employeesdb.roles on(employee.role_id = roles.id);",
        function(error, result, fields) {
            console.table(result)
        });
}

function viewDepartment() {
    con.query(
        "SELECT `title` as 'department' FROM employeesdb.department;",
        function(error, result, fields) {
            console.table(result)
        });
}

function viewMangers() {
    con.query(
        "SELECT `first_name`, `last_name` FROM employeesdb.employee WHERE manager_id IS NOT NULL;",
        function(error, result, fields) {
            console.table(result)
        }
    );
}

function addEmployees() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "what is your employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "what is your employee's last name?"
        },
        {
            type: "input",
            name: "role",
            message: "what is the role Id for thee employee?"
        },
        {
            type: "input",
            name: "manager",
            message: "what is your manager's Id?"
        }
    ]).then((answer) => {
        console.log(answer.firstName);
            con.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstName}","${answer.lastName}",${answer.role},${answer.manager});`,
            function(error, result, answer) {
                if (error) throw error;
                console.table(`${answer.firstName} ${answer.lastName} employee inserted`);
            })
    })
}

function removeEmployees() {
    con.query(
        "SELECT `first_name`, `last_name`, `title` as 'role' FROM employeesdb.employee inner join employeesdb.roles on(employee.role_id = roles.id)",
        function(error, result, fields) {
            console.log(result)
        }
    );
}

function UpdateEmployees() {
    con.query(
        "SELECT `first_name`, `last_name`, `title` as 'role' FROM employeesdb.employee inner join employeesdb.roles on(employee.role_id = roles.id);",
        //UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'
        //"UPDATE employee SET first_name = '*******' WHERE first_name = '*******' ",
        function(error, result, fields) {
            console.log(result)
        }
    );
}