const router = require('express').Router();
const db = require('../../config/mysql2');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employeesData = await db.promise().query('SELECT * FROM employee ORDER BY id')
    if (employeesData) {
        res.status(200).json(employeesData[0]);
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
        const employeeDetails = [req.body.first_name, req.body.last_name, req.body.role_id, req.body.manager_id || null]
        const employeeData = await db.promise().query(
          'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [...employeeDetails]
        )
        res.status(200).json({ message: 'Create new employee successfully', data: employeeData })
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

// find an employee by id
router.get('/:id', async (req, res) => {
  try {
    if (req.params.id) {
      const employeeData = await db.promise().query('SELECT * FROM employee WHERE id=?', req.params.id)
      res.status(200).json(employeeData[0])
    }
    else {
      res.status(404).json({ message: "Must include an id"})
  }
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE employee role
router.put('/:id', async (req, res) => {
    try {
      if (req.body && req.params) {   
        const employeeData = await db.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [req.body.role_id, req.params.id])
        res.status(200).json({ message: 'Update role successfully', data: employeeData })
      }
    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports = router;
