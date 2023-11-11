const inquirer = require('inquirer');

const getDepartments = async () => {
    try {
        const departments = await fetch('http://localhost:3001/api/departments/');
        const data = await (departments.json());
        console.log(data);
    } catch (err) {
        console.error(err)
    }
}

const getRoles = async () => {
    try {
        const roles = await fetch('http://localhost:3001/api/roles/');
        const data = await (roles.json());
        console.log(data)
    }
    catch (err) {
        console.error(err);
    }
}

const getEmployees = async () => {
    try {
        const employees = await fetch('http://localhost:3001/api/employees/');
        const data = await (employees.json());
        console.log(data)
    }
    catch (err) {
        console.error(err);
    }
}
