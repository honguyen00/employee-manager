const router = require('express').Router();
const departmentRoute = require('./departmentsRoute');
const employeesRoute = require('./employeesRoute');
const rolesRoute = require('./rolesRoute');

router.use('/departments', departmentRoute);
router.use('/employees', employeesRoute);
router.use('/roles', rolesRoute);

module.exports = router;
