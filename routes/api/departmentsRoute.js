const router = require('express').Router();
const { Department } = require('../../models');

// GET all departments
router.get('/', async (req, res) => {
  try {
    const departmentData = await Department.findAll({
        order: [["id"]]
    });
    if (departmentData) {
        res.status(200).json(departmentData);
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
        const departmentData = await Department.create({
            department_name: req.body.department_name
        });
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
