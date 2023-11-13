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
    let allRoles = [];
    let allEmployees = [{name: 'None', value: null}]
    query.viewAllRole().then((data) => {
        data.map((item) => {allRoles.push({name: item.title, value: item.id})})
    });
    query.viewAllEmployee().then((data) => {
        data.map((item) => {allEmployees.push({ name: item.employee, value: item.id })});
    });
    let departments = [];
    query.viewAllDepartment().then((data) => {data.map((item) => {departments.push({name: item.departments, value: item.id})})});
    let allManagers = [];
    query.viewAllManagers().then((data) => {data.map((item) => {allManagers.push({name: item.managers, value: item.id})})});
    return inquirer.prompt([
        {
            type: 'list',
            message: 'Please choose what you want to do: ',
            name: 'intro',
            choices: [
                'View all departments', 'View all roles', 'View all employees', 'Add a new department', 'Add a new role', 'Add a new employee', 'Change role of an employee',
                'Change manager of an employee', 'View employees by manager', 'View employees by department', 'Delete a department', 
                'Delete a role', 'Delete an employee', 'View total budget by department', `Quit`
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
                        console.log('\x1b[36m%s\x1b[0m', "Add department successfully!");
                    });
                    
                })
            case 'Add a new role':
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
                        console.log('\x1b[36m%s\x1b[0m', 'Add role successfully!');
                    });
                    
                })
            case 'Add a new employee':
                return inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'Please enter their first name:'
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'Please enter their last name:'
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Please select their role:',
                        choices: allRoles
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Please select their manager (None if not applicable):',
                        choices: allEmployees
                    }
                ]).then(({ firstName, lastName, role, manager}) => {
                    query.addEmployee([firstName, lastName, role, manager]).then(() => {
                        console.log('\x1b[36m%s\x1b[0m', "Add new employee successfully!")
                    })
                })
            case 'Change role of an employee':
                allEmployees.shift();
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Please select employee that need a change in their role:',
                        choices: allEmployees   
                    }, 
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Please select their new role:',
                        choices: allRoles   
                    }
                ]).then(({employee, role}) => {
                    query.updateEmployee(employee, role).then(() => {
                        console.log('\x1b[36m%s\x1b[0m', "Update employee's role successfully!")
                    })
                })
            case 'Change manager of an employee':
                allEmployees.shift();
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Please select employee that need an update in their manager:',
                        choices: allEmployees   
                    }, 
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Please select their new namager:',
                        choices: allEmployees   
                    }
                ]).then(({employee, manager}) => {
                    query.updateManager(employee, manager).then(() => {
                        console.log('\x1b[36m%s\x1b[0m', "Update employee's manager successfully!")
                    })
                })
            case 'View employees by manager':
                allManagers.shift();
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Please select the manager:',
                        choices: allManagers   
                    }
                ]).then(({manager}) => {
                    query.viewEmployeesByManager(manager).then((data) => {
                        console.table(transformedToObject(data));
                    })
                })
            case 'View employees by department':
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Please select the department:',
                        choices: departments   
                    }
                ]).then(({department}) => {
                    query.viewEmployeesByDepartment(department).then((data) => {
                        console.table(transformedToObject(data));
                    })
                })
            case 'Delete a department':
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Please select the department:',
                        choices: departments   
                    }
                ]).then(({department}) => {
                    query.deleteDeparment(department).then((data) => {
                        console.log('\x1b[36m%s\x1b[0m', "Delete department successfully!");
                    })
                })
            case 'Delete a role':
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Please select the role:',
                        choices: allRoles   
                    }
                ]).then(({role}) => {
                    query.deleteRole(role).then(() => {
                        console.log('\x1b[36m%s\x1b[0m', "Delete role successfully!");
                    })
                })
            case 'Delete an employee':
                allEmployees.shift();
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Please select the employee:',
                        choices: allEmployees   
                    }
                ]).then(({employee}) => {
                    query.deleteEmployee(employee).then(() => {
                        console.log('\x1b[36m%s\x1b[0m', "Delete employee successfully!");
                    })
                })
            case 'View total budget by department':
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Please select the department:',
                        choices: departments   
                    }
                ]).then(({department}) => {
                    query.viewBudgetByDepartment(department).then((data) => {
                        console.table(transformedToObject(data));
                    })
                })
            default:
                console.log("Quit program successfully!")
                process.exit(0);
        }
    })
    .then(() => {
        setTimeout(() => {
            menu();
        }, 500)
    })
}

const init = () => {
    menu();
}

init();
