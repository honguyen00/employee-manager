const router = require('express').Router();
const db = require('../../config/mysql2');

// GET all departments
router.get('/', async (req, res) => {
  try {
    const rolesData = await db.promise().query('SELECT * FROM role');
    if(rolesData) {
      res.status(200).json(rolesData[0]);
    }
    else {
        res.status(404).json({ message: "No roles found in database" })
    }   
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new role
router.post('/', async (req, res) => {
    try {
        if (req.body) {
          const roleDetails = [req.body.title, req.body.salary, req.body.department_id]
            const rolesData = await db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [...roleDetails])
            res.status(200).json({ message: "Create new role successfully!", data: rolesData})
        }
        else {
            res.status(404).json({ message: "Cannot create an empty role"})
        }
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;