-- SELECT m.id, CONCAT(m.first_name, ", ", m.last_name) AS employee, role.title as position, CONCAT (e.last_name, ', ', e.first_name) AS manager
-- FROM employee e
-- RIGHT JOIN employee m ON 
-- m.manager_id = e.id
-- JOIN role ON m.role_id = role.id


-- SELECT m.manager_id, CONCAT(m.first_name, ", ", m.last_name) AS managers
-- FROM employee m
-- inner JOIN employee E ON 
-- m.manager_id = e.id
-- ORDER BY manager_id

-- SELECT CONCAT(first_name, ", ", last_name) AS managers FROM employee WHERE id = manager_id

-- SELECT e.id, CONCAT(e.first_name, ", ", e.last_name) AS managers FROM employee m LEFT JOIN employee e ON 
-- e.id = m.manager_id
-- GROUP BY e.id;

-- SELECT id, CONCAT(first_name, " " ,last_name) AS employees FROM employee WHERE manager_id = 9;
SELECT * from employee;
SELECT * from role;

SELECT t1.id, t1.employee FROM 
(SELECT employee.id as id, CONCAT(employee.first_name, " ", employee.last_name) AS employee, employee.role_id
FROM employee JOIN role ON role.id = employee.role_id) t1
LEFT JOIN 
(SELECT role.id as id, title, department.id AS department FROM role JOIN department ON role.department_id = department.id) t2
ON (t1.role_id = t2.id) WHERE t2.department = 1
