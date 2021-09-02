DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
  id int AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
);

CREATE TABLE role (
  id int AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id),
);

CREATE TABLE employee (
  id int AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id),
);
