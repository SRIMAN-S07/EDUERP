const express = require("express");

const router = express.Router();

const {

  addLeave,

  getLeaves,

  updateLeave,

  deleteLeave

} = require(
  "../controllers/leaveController"
);

router.get(
  "/",
  getLeaves
);

router.post(
  "/",
  addLeave
);

router.put(
  "/:id",
  updateLeave
);

router.delete(
  "/:id",
  deleteLeave
);

module.exports = router;