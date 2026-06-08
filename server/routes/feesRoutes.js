const express = require("express");

const router = express.Router();

const {
  addFees,
  getFees,
  deleteFees
} = require("../controllers/feesController");


router.get("/", getFees);

router.post("/", addFees);

router.delete("/:id", deleteFees);


module.exports = router;