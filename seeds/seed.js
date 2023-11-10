const sequelize = require('../config/connection');
const { Department, Employee, Role } = require('../models');

const departmentSeed = require('./departmentSeed.json');
const employeeSeed = require('./employeeSeed.json');
const roleSeed = require('./roleSeed.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const departments = await Department.bulkCreate(departmentSeed);

  const roles = await Role.bulkCreate(roleSeed);

  const employees = await Employee.bulkCreate(employeeSeed);

  process.exit(0);
};

seedDatabase();


