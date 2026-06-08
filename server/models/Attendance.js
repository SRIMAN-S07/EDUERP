const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

  studentId: String,

  name: String,

  department: String,

date: {
  type: String,
  default: () =>
    new Date()
      .toISOString()
      .split("T")[0]
},

  status: String

});

module.exports = mongoose.model(
  "Attendance",
  attendanceSchema
);