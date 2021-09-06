const db = require("./db/connection");
const { prompt } = require("inquirer");
const cTable = require("console.table");
const Query = require("./lib/query");
const chalk = require("chalk-animation");
const q = new Query();

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.\n");
  console.log("Loading...");
  chalk.karaoke(
    " _____                   _                           \n|  ___|                 | |                          \n| |__  _ __ ___   _ __  | |  ___   _   _   ___   ___ \n|  __|| '_ ` _ \\ | '_ \\ | | / _ \\ | | | | / _ \\ / _ \\\n| |___| | | | | || |_) || || (_) || |_| ||  __/|  __/\n\\____/|_| |_| |_|| .__/ |_| \\___/  \\__, | \\___| \\___|\n___  ___         | |                __/ |            \n|  \\/  |         |_|               |___/             \n| .  . |  __ _  _ __    __ _   __ _   ___  _ __      \n| |\\/| | / _` || '_ \\  / _` | / _` | / _ \\| '__|     \n| |  | || (_| || | | || (_| || (_| ||  __/| |        \n\\_|  |_/ \\__,_||_| |_| \\__,_| \\__, | \\___||_|        \n                               __/ |                 \n                              |___/                  "
  );

  setTimeout(() => {
    console.log("Done!\n");
    startPrompt();
  }, 3900);
});

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
    let rolesArr = [];
    let employeesArr = [];
    let managersArr = [];
    let deptsArr = [];

    q.findAllRoles().then(([rolesRows]) => {
      let roles = rolesRows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));
      rolesArr = roleChoices;
    });

    q.findAllManagers().then(([managerRows]) => {
      let managers = managerRows;
      const managerChoices = managers.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
      managersArr = managerChoices;
    });

    q.findAllEmployees().then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
      employeesArr = employeeChoices;
    });

    q.findAllDepartments()
      .then(([rows]) => {
        let depts = rows;
        const deptChoices = depts.map(({ id, name }) => ({
          name: name,
          value: id,
        }));
        deptsArr = deptChoices;
      })
      .then(() => {
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
            q.addEmployee(rolesArr, managersArr).then(() => {
              console.log("\nSuccessfully Added New Employee!\n");
              startPrompt();
            });
            break;
          case "Remove Employee":
            q.removeEmployee(employeesArr).then(() => {
              console.log("\nSuccessfully Removed Employee!\n");
              startPrompt();
            });
            break;
          case "Update Employee Role":
            q.updateEmployeeRole(rolesArr, employeesArr).then(() => {
              console.log("\nSuccessfully Updated Employee Role!\n");
              startPrompt();
            });
            break;
          case "Update Employee Manager":
            q.updateEmployeeManager(employeesArr, managersArr).then(() => {
              console.log("\nSuccessfully Updated Employee Manager!\n");
              startPrompt();
            });
            break;
          case "Add Role":
            q.addRole(deptsArr).then(() => {
              console.log("\nSuccessfully Added Role!\n");
              startPrompt();
            });
            break;
          case "Remove Role":
            q.removeRole(rolesArr).then(() => {
              console.log("\nSuccessfully Removed Role!\n");
              startPrompt();
            });
            break;
          case "Add Department":
            q.addDepartment().then(() => {
              console.log("\nSuccessfully Added Department!\n");
              startPrompt();
            });
            break;
          case "Remove Department":
            q.removeDept(deptsArr).then(() => {
              console.log("\nSuccessfully Removed Department!\n");
              startPrompt();
            });
            break;
          case "Exit the Application":
            return db.end();
        }
      });
  });
}
