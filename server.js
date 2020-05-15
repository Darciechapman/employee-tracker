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
    function(error, result) {
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
        // } else if (action === "Remove employee") {
        //     removeEmployees()
        } else {
            updateEmployees()
        }
    });

}

function viewEmployees() {
    con.query(
        "SELECT `first_name`, `last_name`, `title` as 'role' FROM employeesdb.employee inner join employeesdb.roles on(employee.role_id = roles.id);",
        function(error, result) {
            console.table(result)
        });
}

function viewDepartment() {
    con.query(
        "SELECT `title` as 'department' FROM employeesdb.department;",
        function(error, result) {
            console.table(result)
        });
}

function viewMangers() {
    con.query(
        "SELECT `first_name`, `last_name` FROM employeesdb.employee WHERE manager_id IS NOT NULL;",
        function(error, result) {
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

// function removeEmployees() {
//     con.query(
//         "SELECT `first_name`, `last_name` FROM employeesdb.employee;",
//         function(error, result) {
//             const employeeOptions = [];
//             for (let i = 0; i < result.length; i++) {
//                 console.log(result[i].title);
//                 employeeOptions.push(results[i].first_name + " " + results[i].last_name)
//             }

//             inquirer.prompt([
//                 {
//                     type: "list",
//                     name: "employee",
//                     message: "Which emplyee would you like to delete?",
//                     choices: employeeOptions
//                 }

//             ]).then(({ deleteEmployee }) => {
//                 console.log(deleteEmployee)
//                 const updateQueryString = `DELETE FROM customers WHERE firstname = {} lastname = {};`

//                 con.query(
//                     updateQueryString,
//                     function(error, result) {
//                         //console.log(error)
//                         console.log(deleteEmployee + " has been deleted");
//                     }
//                 );
//             });

//         }
//     )
// }
//var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";

function updateEmployees() {
    con.query(
        "SELECT `title` FROM employeesdb.roles;",
        function(error, result) {
            const roleOptions = [];
            for (let i = 0; i < result.length; i++) {
                console.log(result[i].title);
                roleOptions.push(result[i].title)
            }

            inquirer.prompt([
                {
                    type: "list",
                    name: "role",
                    message: "Which role do you want to edit?",
                    choices: roleOptions
                }
            ]).then(({ role }) => {

                inquirer.prompt([
                    {
                        type: "number",
                        name: "newRoleSalary",
                        message: "what is the new salary for " + role,
                    }
                ]).then(({ newRoleSalary }) => {
                    const updateQueryString = `UPDATE roles SET salary = ${newRoleSalary} WHERE title = '${role}';`

                    con.query(
                        updateQueryString,
                        function(error, result) {
                            //console.log(error)
                            console.log(role + " has been updated");
                        }
                    );
                });

            });
        }
    )
}