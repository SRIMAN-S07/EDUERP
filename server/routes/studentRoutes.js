const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

const {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
  getStudentsByDepartment
} = require("../controllers/studentController");


// 🔥 STATS
router.get("/stats", async (req, res) => {

  try {

    const stats = await Student.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 }
        }
      }
    ]);

    const total = await Student.countDocuments();

    res.json({
      total,
      departments: stats
    });

  } catch (err) {

    res.status(500).json({
      error: "Stats error"
    });

  }

});


// 🔥 SEARCH
router.get("/search/:id", async (req, res) => {

  const keyword = req.params.id;

  const students = await Student.find({
    studentId: {
      $regex: keyword,
      $options: "i"
    }
  });

  res.json(students);

});


// 🔥 FIND SINGLE STUDENT
router.get("/find/:studentId", async (req, res) => {

  try {

    const student = await Student.findOne({
      studentId: req.params.studentId
    });

    res.json(student);

  } catch (err) {

    res.status(500).json({
      error: "Server Error"
    });

  }

});


// 🔥 DEPARTMENT FILTER
router.get(
  "/department/:department",
  getStudentsByDepartment
);


// 🔥 RECENT STUDENTS
router.get("/recent", async (req, res) => {

  try {

    const students = await Student.find()
      .sort({ _id: -1 })
      .limit(5);

    res.json(students);

  } catch (err) {

    res.status(500).json({
      error: "Server Error"
    });

  }

});


// 🔥 MAIN ROUTES
router.get("/", getStudents);

router.post("/", addStudent);

router.delete("/:id", deleteStudent);

router.put("/:id", updateStudent);


// 🔥 EXPORT
module.exports = router;