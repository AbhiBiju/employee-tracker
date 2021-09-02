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
        q.viewAllEmployees();
        break;
      case "View Employees By Manager":
        q.viewAllByManagers();
        break;
      case "View Employees By Department":
        q.viewAllByDepartments();
        break;
      case "Add Employee":
        prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name ",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name ",
          },
          {
            type: "list",
            name: "newbieRole",
            message: "What is the employee's role? ",
            choices: q.getRoles(),
          },
          {
            name: "manager",
            type: "list",
            message: "Who is the Employee's manager?",
            choices: q.getManagers(),
          },
        ]).then((res) => q.addEmployee(res));
        break;
      case "Remove Employee":
        break;
      case "Update Employee Role":
        break;
      case "Update Employee Manager":
        break;
      case "Add Role":
        break;
      case "Remove Role":
        break;
      case "Add Department":
        break;
      case "Remove Department":
        break;
      case "Exit the Application":
        return db.end();
    }
    startPrompt();
  });
}
