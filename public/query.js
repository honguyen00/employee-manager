const db = require('../config/mysql2');

class Query {
    async viewAllDepartment() {
        try {
            const data = await db.promise().query('SELECT id, department_name AS departments FROM department ORDER BY id');
            return data[0];
        } catch (error) {
            return console.error(error);
        }
    }

    async viewAllRole() {
        try {
            const data = await db.promise().query('SELECT role.id, title, department.department_name AS department, salary FROM role JOIN department ON role.department_id = department.id ORDER BY role.id');
            return data[0];
        } catch (error) {
            return console.error(error);
        }        
    }

    async viewAllEmployee() {
        try {
            const data = await db.promise().query(
                "SELECT m.id, CONCAT(m.first_name, ' ', m.last_name) AS employee, role.title as position, CONCAT (e.first_name, ' ', e.last_name) AS manager FROM employee e RIGHT JOIN employee m ON m.manager_id = e.id JOIN role ON m.role_id = role.id ORDER BY m.id");
            return data[0];
        } catch (error) { 
            return console.error(error);
        }
    }

    async addDepartment(departmentDetail) {
        try {
            const data = await db.promise().query('INSERT INTO department (department_name) VALUES (?)', departmentDetail);
            return data;
        } catch (error) {
            return console.error(error);
        }
    }

    async addRole(roleDetail) {
        try {
            const data = await db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [...roleDetail]);
            return data;
        } catch (error) {
            return console.error(error);
        }
        
    }

    async addEmployee(employeeDetail) {
        try {
            const data = await db.promise().query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [...employeeDetail]);
            return data;
        } catch (error) {
            return console.error(error);
        }
    }

    async deleteDeparment(id) {
        try {
            const data = await db.promise().query('DELETE FROM department WHERE id = ?', id);
            return data;
        } catch (error) {
            return console.error(error);
        }
    }

    async deleteRole(id) {
        try {
            const data = await db.promise().query('DELETE FROM role WHERE id = ?', id);
            return data;
        } catch (error) {
            return console.error(error);
        }
        
    }

    async deleteEmployee(id) {
        try {
            const data = await db.promise().query(
            'DELETE FROM employee WHERE id = ?', id);
            return data;
        } catch (error) {
            return console.error(error);
        }
    }

    async updateEmployee(id, roleid) {
        try {
            const data = await db.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [roleid, id]);
            return data;
        } catch (error) {
            return console.error(error);
        }
    }

    async updateManager(id, managerid) {
        try {
            const data = await db.promise().query('UPDATE employee SET manager_id = ? WHERE id = ?', [managerid, id]);
            return data;
        } catch (error) {
            return console.error(error);
        }
    }

    async viewAllManagers() {
        try {
            const data = await db.promise().query('SELECT e.id, CONCAT(e.first_name," ", e.last_name) AS managers FROM employee m LEFT JOIN employee e ON e.id = m.manager_id GROUP BY e.id;');
            return data[0];
        } catch (error) {
            return console.error(error);
        }
    }

    async viewEmployeesByManager(manager_id) {
        try {
            const data = await db.promise().query('SELECT id, CONCAT(first_name, " " ,last_name) AS employees FROM employee WHERE manager_id = ?', manager_id);
            return data[0];
        } catch (error) {
            return console.error(error);
        }
    }

    async viewEmployeesByDepartment(department_id) {
        try {
            const data = await db.promise().query(`SELECT t1.id, t1.employees, t2.title FROM 
            (SELECT employee.id AS id, CONCAT(employee.first_name, " ", employee.last_name) AS employees, employee.role_id
            FROM employee JOIN role ON role.id = employee.role_id) t1
            LEFT JOIN 
            (SELECT role.id as id, title, department.id AS department FROM role JOIN department ON role.department_id = department.id) t2
            ON (t1.role_id = t2.id) WHERE t2.department = ?`, department_id);
            return data[0];
        } catch (error) {
            return console.error(error);
        }
    }

    async viewBudgetByDepartment(department_id) {
        try {
            const data = await db.promise().query(`SELECT t2.department_id AS id, t2.department, SUM(t2.salary) AS total_budget FROM 
            (SELECT employee.id as id, employee.role_id
            FROM employee JOIN role ON role.id = employee.role_id) t1
            LEFT JOIN 
            (SELECT role.id as id, role.salary, department.id AS department_id, department.department_name AS department FROM role JOIN department ON role.department_id = department.id) t2
            ON (t1.role_id = t2.id) WHERE t2.department_id = ?`, department_id);
            return data[0];
        } catch (error) {
            return console.error(error);
        }
    }
}

module.exports = Query;