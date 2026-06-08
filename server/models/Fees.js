const mongoose = require("mongoose");

const feesSchema = new mongoose.Schema({

  studentId: String,

  name: String,

  department: String,

  amount: Number,

  status: String,

  date: {
    type: String,
    default: () =>
      new Date().toLocaleDateString()
  }

});

module.exports = mongoose.model(
  "Fees",
  feesSchema
);