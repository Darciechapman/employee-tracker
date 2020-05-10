DROP DATABASE IF EXISTS employeesdb;

CREATE DATABASE employeesdb;

USE employeesdb;

CREATE TABLE department (
	id INTEGER AUTO_INCREMENT NOT NULL,
	title VARCHAR(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE roles (
	id INTEGER AUTO_INCREMENT NOT NULL,
	title VARCHAR(30) NOT NULL,
	salary DECIMAL NOT NULL,
    department_id INTEGER,
	PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
	id INTEGER AUTO_INCREMENT NOT NULL,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
	PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department
  (title)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');
INSERT INTO roles
  (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4);
INSERT INTO employee
  (first_name, last_name, role_id)
VALUES
  ('Spacetaylor', 'Russellmoondancer', 1),
  ('Howardsef', 'Roberg', 3),
  ('Hermiguilar', 'Wager', 5),
  ('Weane', 'Harkker', 6);
  INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
  VALUES
    ('Kramcia', 'Firerong', 2, 1),
    ('Waradrin', 'Magicwalker', 4, 2),
    ('Shazora', 'Bradleflame', 7, 4);