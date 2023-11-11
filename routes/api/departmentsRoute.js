const router = require('express').Router();
const db = require('../../config/mysql2');

// GET all departments
router.get('/', async (req, res) => {
  try {
      const departmentData = await db.promise().query('SELECT * FROM department ORDER BY id')
      if (departmentData) {
        res.status(200).json(departmentData[0]);
      } else {
          res.status(404).json({ message: "No department found in database" })
      } 
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new department
router.post('/', async (req, res) => {
    try {
      if (req.body) {
        const departmentData = await db.promise().query('INSERT INTO department (department_name) VALUES (?)', req.body.department_name)
        res.status(200).json({ message: 'Create new department successfully', data: departmentData })
      }
      else {
        res.status(404).json({ message: "Cannot create an empty department"})
    }
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
