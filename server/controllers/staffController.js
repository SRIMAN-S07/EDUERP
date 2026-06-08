const Staff = require("../models/Staff");


// ADD STAFF


// ADD STAFF
exports.addStaff = async (req, res) => {

  try {

    const {
      name,
      age,
      department
    } = req.body;

    // Department-wise count
    const total =
      await Staff.countDocuments({
        department
      });

    const number =
      String(total + 1).padStart(3, "0");

    const staffId =
      `STF${department}${number}`;

    const staff = new Staff({

      staffId,

      name,

      age,

      department,

      role: "staff",

      password: "staff123"

    });

    await staff.save();

    res.json(staff);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Server Error"
    });

  }

};

// GET
exports.getStaffs = async (req, res) => {

  const data = await Staff.find();

  res.json(data);
};


// DELETE
exports.deleteStaff = async (req, res) => {

  await Staff.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted"
  });
};


// UPDATE
exports.updateStaff = async (req, res) => {

  const updated = await Staff.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};