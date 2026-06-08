const Attendance = require("../models/Attendance");


// ADD
exports.addAttendance = async (req, res) => {

  try {

    const attendance = new Attendance(req.body);

    await attendance.save();

    res.json(attendance);

  } catch (err) {

    res.status(500).json({
      error: "Server Error"
    });

  }
};


// GET
exports.getAttendance = async (req, res) => {

  const data = await Attendance.find();

  res.json(data);
};


// DELETE
exports.deleteAttendance = async (req, res) => {

  await Attendance.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted"
  });
};