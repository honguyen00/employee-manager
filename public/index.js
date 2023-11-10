const inquirer = require('inquirer');

const getDepartments = async () => {
    try {
        const departments = await fetch('http://localhost:3001/api/departments/', {
            method: 'GET'
        });
        const data = await (departments.json());
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}

getDepartments();