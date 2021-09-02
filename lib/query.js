const db = require("../db/connection");
const { prompt } = require("inquirer");

class Query {
  viewAllByDepartments() {
    db.query(
      "SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY department.name;",
      (err, res) => {
        if (err) throw err;
        console.table(res);
      }
    );
  }

  viewAllByManagers() {
    db.query(
      "SELECT employee.first_name,employee.last_name,role.title,CONCAT(e.first_name,' ',e.last_name)AS Manager FROM employee JOIN role ON role.id=employee.role_id LEFT JOIN employee e ON e.id=employee.manager_id WHERE employee.manager_id IS NOT NULL",
      (err, res) => {
        if (err) throw err;
        console.table(res);
      }
    );
  }

  viewAllEmployees() {
    db.query(
      "SELECT employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS Role, department.name AS Department, role.salary AS Salary, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee e ON employee.manager_id = e.id;",
      (err, res) => {
        if (err) throw err;
        console.table(res);
      }
    );
  }

  getRoles() {
    let rolesArr = [];

    db.query("SELECT * FROM role", (err, res) => {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) rolesArr.push(res[i].title);
    });

    return rolesArr;
  }

  getManagers() {
    let managersArr = [];

    db.query(
      "SELECT CONCAT(employee.first_name,' ',employee.last_name)AS Manager FROM employee WHERE employee.manager_id IS NULL;",
      (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) managersArr.push(res[i].Manager);
      }
    );

    return managersArr;
  }
  addEmployee(res) {
    db.query("")
  }
}

module.exports = Query;
`
View All Employees,
View Employees By Manager,
View Employees By Department,
Add Employee,
Remove Employee,
Update Employee Role,
Update Employee Manager,
Add Role,
Remove Role,
Add Department,
Remove Department`;
`
view all departments, 
view all roles, 
view all employees, 
add a department, 
add a role, 
add an employee, 
update an employee role`;
