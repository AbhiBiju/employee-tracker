INSERT INTO department (name)
VALUES ("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead",100000,1),
("Salesperson",80000,1),
("Lead Engineer",150000,2),
("Software Engineer", 120000, 2),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

-- Possible role combos:-> null,1 | 1,2 | null,3 | 2,4 | 3,5 | null,6 | 4,7
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES (
  "first_name": "Honey",
  "last_name": "Corradino",
  "manager_id": null,
  "role_id": 6
), (
  "first_name": "Appolonia",
  "last_name": "Dagworthy",
  "manager_id": 2,
  "role_id": 4
), (
  "first_name": "Jereme",
  "last_name": "Sugarman",
  "manager_id": 1,
  "role_id": 2
), (
  "first_name": "Ariadne",
  "last_name": "Cherrie",
  "manager_id": 3,
  "role_id": 5
), (
  "first_name": "Norris",
  "last_name": "Arpur",
  "manager_id": 4,
  "role_id": 7
), (
  "first_name": "Mala",
  "last_name": "Oldrey",
  "manager_id": 3,
  "role_id": 5
), (
  "first_name": "Robby",
  "last_name": "Rucklidge",
  "manager_id": null,
  "role_id": 1
), (
  "first_name": "Ranique",
  "last_name": "Crayden",
  "manager_id": null,
  "role_id": 3
), (
  "first_name": "Dori",
  "last_name": "Vasiliev",
  "manager_id": 3,
  "role_id": 5
), (
  "first_name": "Elwira",
  "last_name": "Mullinder",
  "manager_id": 1,
  "role_id": 2
), (
  "first_name": "Carlo",
  "last_name": "Vinden",
  "manager_id": 2,
  "role_id": 4
), (
  "first_name": "Margarita",
  "last_name": "Flukes",
  "manager_id": 3,
  "role_id": 5
), (
  "first_name": "Randi",
  "last_name": "Shafto",
  "manager_id": 4,
  "role_id": 7
), (
  "first_name": "Julienne",
  "last_name": "Fysh",
  "manager_id": 4,
  "role_id": 7
);
  