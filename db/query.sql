-- SELECT m.id, CONCAT(m.first_name, ", ", m.last_name) AS employee, role.title as position, CONCAT (e.last_name, ', ', e.first_name) AS manager
-- FROM employee e
-- RIGHT JOIN employee m ON 
-- m.manager_id = e.id
-- JOIN role ON m.role_id = role.id


SELECT role.id, title, department.department_name AS department, salary FROM role JOIN
department ON role.department_id = department.id