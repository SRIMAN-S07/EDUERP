const mongoose = require("mongoose");

const staffSchema =
  new mongoose.Schema({

    staffId: {
      type: String,
      unique: true
    },

    name: String,

    department: String,

    subject: String,

    password: String,

    role: {
      type: String,
      default: "staff"
    }

  });

module.exports =
  mongoose.model(
    "Staff",
    staffSchema
  );