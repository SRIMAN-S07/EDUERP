const express = require("express");

const router = express.Router();

const Staff = require("../models/Staff");

const {
  getStaffs,
  addStaff,
  deleteStaff,
  updateStaff
} = require("../controllers/staffController");


// 🔥 STATS
router.get("/stats", async (req, res) => {
  try {

    const stats = await Staff.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 }
        }
      }
    ]);

    const total = await Staff.countDocuments();

    res.json({
      total,
      departments: stats
    });

  } catch (err) {
    res.status(500).json({
      error: "Stats error"
    });
  }
});


// 🔥 SEARCH
router.get("/search/:id", async (req, res) => {

  const keyword = req.params.id;

  const staff = await Staff.find({
    staffId: {
      $regex: keyword,
      $options: "i"
    }
  });

  res.json(staff);
});


// 🔥 RECENT STAFF
router.get("/recent", async (req, res) => {
  try {

    const staff = await Staff.find()
      .sort({ _id: -1 })
      .limit(5);

    res.json(staff);

  } catch (err) {

    res.status(500).json({
      error: "Server Error"
    });

  }
});


// 🔥 MAIN ROUTES
router.get("/", getStaffs);

router.post("/", addStaff);

router.delete("/:id", deleteStaff);

router.put("/:id", updateStaff);


module.exports = router;