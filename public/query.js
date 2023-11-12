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

    async updateEmployee(id, roleid) {
        try {
            const data = await db.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [roleid, id]);
            return data;
        } catch (error) {
            return console.error(error);
        }
    }
}

module.exports = Query;