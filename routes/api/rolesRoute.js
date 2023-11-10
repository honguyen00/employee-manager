const router = require('express').Router();
const { Role } = require('../../models');

// GET all departments
router.get('/', async (req, res) => {
  try {
    const rolesData = await Role.findAll();
    if (rolesData) {
        res.status(200).json(rolesData);
    } else {
        res.status(404).json({ message: "No roles found in database" })
    }   
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a department
router.post('/', async (req, res) => {
    try {
        if (req.body) {
            const rolesData = await Role.create({
                title: req.body.title,
                salary: req.body.salary,
                department_id: req.body.department_id
            });
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