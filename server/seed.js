const mongoose = require("mongoose");
const Student = require("./models/Student");

mongoose.connect("mongodb://localhost:27017/eduerp");

const departments = ["CSC", "BCA", "BTH"];

const generateStudents = async () => {
  await Student.deleteMany(); // clear old data

  let students = [];

  for (let i = 1; i <= 100; i++) {
    const dept = departments[Math.floor(Math.random() * departments.length)];

    const student = {
      studentId: `U23${dept}${String(i).padStart(3, "0")}`,
      name: `Student${i}`,
      age: Math.floor(Math.random() * 10) + 18,
      department: dept
    };

    students.push(student);
  }

  await Student.insertMany(students);

  console.log("100 Students Inserted 🔥");
  mongoose.connection.close();
};

generateStudents();