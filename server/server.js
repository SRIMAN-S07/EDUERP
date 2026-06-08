const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const staffRoutes = require("./routes/staffRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const feesRoutes = require("./routes/feesRoutes");

const app = express();
const authRoutes =
  require("./routes/authRoutes");
  const leaveRoutes =
require("./routes/leaveRoutes");


// 🔥 MIDDLEWARE
app.use(cors());
app.use(express.json());


// 🔥 DB CONNECT
mongoose.connect("mongodb://localhost:27017/eduerp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// 🔥 ROUTES
app.use("/students", studentRoutes);

app.use("/staff", staffRoutes);

app.use("/attendance", attendanceRoutes);
app.use("/fees", feesRoutes);
app.use("/auth", authRoutes);
app.use(
  "/leave",
  leaveRoutes
);


// 🔥 HOME
app.get("/", (req, res) => {
  res.send("API Working 🚀");
});


// 🔥 SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});