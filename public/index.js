const boxen = require('boxen')
const inquirer = require('inquirer')
const Query = require('./query');
const query = new Query();

function transformedToObject(arr) {
    const transformed = arr.reduce((item, {id, ...x}) => { item[id] = x;  return item}, {});
    return transformed;
}


console.log(boxen('EMPLOYEE MANAGER', {padding: 1, borderStyle: 'double', backgroundColor: 'gray'}))
const menu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'Please choose what you want to do: ',
            name: 'intro',
            choices: [
                'View all departments', 'View all roles', 'View all employees', 'Add a new department', 'Add a new role', 'Add a new employee', 'Change role of an employee', `Quit`
            ]
        }
    ])
    .then(({ intro }) => {
        switch (intro) {
            case 'View all departments':
                query.viewAllDepartment().then((data) => {
                    console.table(transformedToObject(data));
                })
                break;
            case 'View all roles':
                query.viewAllRole().then(data => {
                    console.table(transformedToObject(data));
                })
                break
            case 'View all employees':
                query.viewAllEmployee().then((data) => {
                    console.table(transformedToObject(data));
                })
                break
            case 'Add a new department':
                return inquirer.prompt([
                    {
                        type: 'input',
                        name: 'newDepartment',
                        message: 'Please enter new department name:'
                    }
                ]).then(({ newDepartment }) => {
                    query.addDepartment(newDepartment).then(() => {
                        console.log("%c Add department successfully!", "color: green;");
                    });
                    
                })
            case 'Add a new role':
                let departments = [];
                query.viewAllDepartment().then((data) => {departments = data.map((item) => {departments.push({name: item.departments, value: item.id})})});
                return inquirer.prompt([
                    {
                        type: 'input',
                        name: 'roleTitle',
                        message: 'Please enter new role title:'
                    },
                    {
                        type: 'number',
                        name: 'roleSalary',
                        message: 'Please enter new role salary:'
                    },
                    {
                        type: 'list',
                        name: 'roleDepartment',
                        message: 'Please choose the department this new role belongs to:',
                        choices: departments
                    }
                ]).then(({ roleTitle, roleSalary, roleDepartment }) => {
                    query.addRole([roleTitle, roleSalary, roleDepartment]).then(() => {
                        console.log('%c Add role successfully!', "color: green;");
                    });
                    
                })
            case 'Add a new employee':
                let allRoles = [];
                let allEmployees = []
                query.viewAllRole().then((data) => {
                    allRoles = data.map((item) => {allRoles.push({name: item.title, value: item.id})})
                });
                query.viewAllEmployee().then((data) => {
                    allEmployees = data.map((item) => {allEmployees.push({name: item.first_name + " " + item.last_name, value: item.id})})
                })
                return inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName'
                    }
                ])
                break
            case 'Change role of an employee':
        
                break
            default:
                console.log("Quit program successfully!")
                process.exit(0);
        }
    })
    .then(() => {
        setTimeout(() => {
            menu();
        }, 200)
    })
}

const init = () => {
    menu();
}

init();
