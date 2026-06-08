const Fees = require("../models/Fees");


// ADD
exports.addFees = async (req, res) => {

  try {

    const fees = new Fees(req.body);

    await fees.save();

    res.json(fees);

  } catch (err) {

    res.status(500).json({
      error: "Server Error"
    });

  }
};


// GET
exports.getFees = async (req, res) => {

  const data = await Fees.find();

  res.json(data);
};


// DELETE
exports.deleteFees = async (req, res) => {

  await Fees.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted"
  });
};