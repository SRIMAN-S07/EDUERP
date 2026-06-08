const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({

  studentId: String,

  name: String,

  department: String,

  type: String, // Leave or OD

  reason: String,

  fromDate: String,

  toDate: String,

  status: {
    type: String,
    default: "Pending"
  }

});

module.exports = mongoose.model(
  "Leave",
  leaveSchema
);