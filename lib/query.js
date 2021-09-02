function viewAllDepartments() {
  db.query(
    "SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
    }
  );
}

function viewAllRoles() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}

function viewAllEmployees() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}
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
