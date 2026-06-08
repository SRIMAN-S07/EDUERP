const Leave = require("../models/Leave");
const Attendance = require("../models/Attendance");

// ADD REQUEST
exports.addLeave = async (req, res) => {

  try {

    const leave =
      new Leave(req.body);

    await leave.save();

    res.json(leave);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Server Error"
    });

  }

};

// GET ALL
exports.getLeaves = async (req, res) => {

  const data =
    await Leave.find();

  res.json(data);

};

// UPDATE STATUS
exports.updateLeave = async (req, res) => {

  try {

    const leave =
      await Leave.findById(
        req.params.id
      );

    if (!leave) {

      return res.status(404).json({
        error: "Request not found"
      });

    }

    leave.status =
      req.body.status;

    await leave.save();

    // APPROVED na attendance create
    if (
      req.body.status ===
      "Approved"
    ) {

      const start =
        new Date(
          leave.fromDate
        );

      const end =
        new Date(
          leave.toDate
        );

      for (
        let d = new Date(start);
        d <= end;
        d.setDate(
          d.getDate() + 1
        )
      ) {

        const date =
          d.toISOString()
           .split("T")[0];

        const alreadyExists =
          await Attendance.findOne({
            studentId:
              leave.studentId,
            date
          });

        if (
          !alreadyExists
        ) {

          await Attendance.create({

            studentId:
              leave.studentId,

            name:
              leave.name,

            department:
              leave.department,

            date,

            status:
              leave.type // Leave or OD

          });

        }

      }

    }

    res.json(leave);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Server Error"
    });

  }

};

// DELETE
exports.deleteLeave = async (req, res) => {

  await Leave.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Deleted"
  });

};