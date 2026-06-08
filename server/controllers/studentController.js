const Student = require("../models/Student");
const Counter = require("../models/Counter");

// ADD STUDENT
exports.addStudent = async (req, res) => {

  try {

    const {
      name,
      age,
      department,
      year,
      type
    } = req.body;

    let counter = await Counter.findOne({
      department,
      type
    });

    if (!counter) {

      counter = new Counter({
        department,
        type,
        count: 0
      });

    }

    counter.count += 1;

    await counter.save();

    const number = String(
      counter.count
    ).padStart(3, "0");

    const studentId =
      `${type || "U"}${year || "23"}${department}${number}`;

    const student = new Student({

      studentId,

      name,

      age,

      department,

      password: studentId,

      role: "student"

    });

    await student.save();

    res.json(student);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Something went wrong"
    });

  }

};

// GET ALL STUDENTS
exports.getStudents = async (req, res) => {

  try {

    const data =
      await Student.find();

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: "Server Error"
    });

  }

};

// GET STUDENTS BY DEPARTMENT
exports.getStudentsByDepartment =
  async (req, res) => {

    try {

      const students =
        await Student.find({
          department:
            req.params.department
        });

      res.json(students);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Server Error"
      });

    }

};

// DELETE
exports.deleteStudent = async (req, res) => {

  try {

    await Student.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted"
    });

  } catch (err) {

    res.status(500).json({
      error: "Server Error"
    });

  }

};

// UPDATE
exports.updateStudent = async (req, res) => {

  try {

    const updated =
      await Student.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }

      );

    res.json(updated);

  } catch (err) {

    res.status(500).json({
      error: "Server Error"
    });

  }

};