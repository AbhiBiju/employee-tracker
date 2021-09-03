const db = require("./db/connection");
const { prompt } = require("inquirer");
const { table } = require("console.table");
const Query = require("./lib/query");
const q = new Query();

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  startPrompt();
});

console.log(
  " _____                   _                           \n|  ___|                 | |                          \n| |__  _ __ ___   _ __  | |  ___   _   _   ___   ___ \n|  __|| '_ ` _ \\ | '_ \\ | | / _ \\ | | | | / _ \\ / _ \\\n| |___| | | | | || |_) || || (_) || |_| ||  __/|  __/\n\\____/|_| |_| |_|| .__/ |_| \\___/  \\__, | \\___| \\___|\n___  ___         | |                __/ |            \n|  \\/  |         |_|               |___/             \n| .  . |  __ _  _ __    __ _   __ _   ___  _ __      \n| |\\/| | / _` || '_ \\  / _` | / _` | / _ \\| '__|     \n| |  | || (_| || | | || (_| || (_| ||  __/| |        \n\\_|  |_/ \\__,_||_| |_| \\__,_| \\__, | \\___||_|        \n                               __/ |                 \n                              |___/                  "
);
function startPrompt() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Managers",
        "View All Departments",
        "View All Roles",
        "View Employees By Role",
        "View Employees By Manager",
        "View Employees By Department",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Add Role",
        "Remove Role",
        "Add Department",
        "Remove Department",
        "Exit the Application",
      ],
    },
  ]).then((picked) => {
    switch (picked.choice) {
      case "View All Employees":
        q.findAllEmployees().then(([res]) => {
          console.table(res);
          startPrompt();
        });
        break;
      case "View All Managers":
        q.findAllManagers().then(([rows]) => {
          console.table(rows);
          startPrompt();
        });
        break;
      case "View All Departments":
        q.findAllDepartments().then(([rows]) => {
          console.table(rows);
          startPrompt();
        });
        break;
      case "View All Roles":
        q.findAllRoles().then(([rows]) => {
          console.table(rows);
          startPrompt();
        });
        break;
      case "View Employees By Role":
        q.viewAllByRole().then(([rows]) => {
          console.table(rows);
          startPrompt();
        });
        break;
      case "View Employees By Manager":
        q.viewAllByManagers().then(([res]) => {
          console.table(res);
          startPrompt();
        });
        break;
      case "View Employees By Department":
        q.viewAllByDepartments().then(([res]) => {
          console.table(res);
          startPrompt();
        });
        break;
      case "Add Employee":
        let rolesArr = [];
        let managersArr = [];

        q.findAllRoles().then(([rolesRows]) => {
          let roles = rolesRows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          rolesArr = roleChoices;
        });

        q.findAllManagers()
          .then(([managerRows]) => {
            let managers = managerRows;
            const managerChoices = managers.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            }));
            managersArr = managerChoices;
          })
          .then(() => {
            q.addEmployee(rolesArr, managersArr).then(() => {
              console.log("\nSuccessfully Added New Employee!\n");
              startPrompt();
            });
          });
        break;
      case "Remove Employee":
        let employeesArr = [];

        q.findAllEmployees()
          .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            }));
            employeesArr = employeeChoices;
          })
          .then(() => {
            q.removeEmployee(employeesArr).then(() => {
              console.log("\nSuccessfully Removed Employee!\n");
              startPrompt();
            });
          });
        break;
      case "Update Employee Role":
        let rolesArr2 = [];
        let employeesArr2 = [];

        q.findAllRoles().then(([rolesRows]) => {
          let roles = rolesRows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          rolesArr2 = roleChoices;
        });
        q.findAllEmployees()
          .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            }));
            employeesArr2 = employeeChoices;
          })
          .then(() => {
            q.updateEmployeeRole(rolesArr2, employeesArr2).then(() => {
              console.log("\nSuccessfully Updated Employee Role!\n");
              startPrompt();
            });
          });
        break;
      case "Update Employee Manager":
        let managersArr2 = [];
        let employeesArr3 = [];

        q.findAllEmployees().then(([rows]) => {
          let employees = rows;
          const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
          }));
          employeesArr3 = employeeChoices;
        });

        q.findAllManagers()
          .then(([managerRows]) => {
            let managers = managerRows;
            const managerChoices = managers.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            }));
            managersArr2 = managerChoices;
          })
          .then(() => {
            q.updateEmployeeManager(employeesArr3, managersArr2).then(() => {
              console.log("\nSuccessfully Updated Employee Manager!\n");
              startPrompt();
            });
          });
        break;
      case "Add Role":
        let deptsArr = [];
        q.findAllDepartments().then(([rows]) => {
          let depts = rows;
          const deptChoices = depts.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          deptsArr = deptChoices;
        });
        q.addRole(deptsArr).then(() => {
          console.log("\nSuccessfully Added Role!\n");
          startPrompt();
        });
        break;
      case "Remove Role":
        let rolesArr3 = [];
        q.findAllRoles().then(([rolesRows]) => {
          let roles = rolesRows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          rolesArr3 = roleChoices;
        }).then(()=>{
          q.removeRole(rolesArr3).then(()=>{
            console.log("\nSuccessfully Removed Role!\n");
            startPrompt();
          })
        });
        break;
      case "Add Department":
        q.addDepartment().then(() => {
          console.log("\nSuccessfully Added Department!\n");
          startPrompt();
        });
        break;
      case "Remove Department":
        let deptsArr2 = [];
        q.findAllDepartments().then(([rows]) => {
          let depts = rows;
          const deptChoices = depts.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          deptsArr2 = deptChoices;
        }).then(()=>{
          q.removeDept(deptsArr2).then(()=>{
            console.log("\nSuccessfully Removed Department!\n");
            startPrompt();
          })
        });
        break;
      case "Exit the Application":
        return db.end();
    }
  });
}
