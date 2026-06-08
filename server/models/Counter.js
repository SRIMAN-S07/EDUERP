const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({

  department: String,

  type: String,

  count: Number

});

module.exports = mongoose.model(
  "Counter",
  counterSchema
);