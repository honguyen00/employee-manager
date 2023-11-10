const router = require('express').Router();
const { Employee } = require('../../models');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employeesData = await Employee.findAll();
    if (employeesData) {
        res.status(200).json(employeesData);
    } else {
        res.status(404).json({ message: "No employees found in database" })
    }   
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new employee
router.post('/', async (req, res) => {
    try {
      if (req.body) {
        const employeeData = await Employee.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            role_id: req.body.role_id,
            manager_id: req.body.manager_id || null
        });
        res.status(200).json({ message: 'Create new department successfully', data: employeeData })
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

// POST a new employee
router.put('/:id', async (req, res) => {
    try {
      if (req.body && req.params) {
        const employeeData = await Employee.update({
            role_id: req.body.role_id
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'Update role successfully', data: employeeData })
      }
    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports = router;
