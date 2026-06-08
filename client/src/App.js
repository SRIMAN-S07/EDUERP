import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Fees from "./pages/Fees";
import Staff from "./pages/Staff";

import Login from "./pages/Login";

import StudentDashboard from "./pages/StudentDashboard";
import StaffDashboard
from "./pages/StaffDashboard";
import ApplyRequest from "./pages/ApplyRequest";
import AttendanceHistory
from "./pages/AttendanceHistory";

function App() {

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  const [page, setPage] =
  useState(
    role === "student"
      ? "StudentDashboard"
      : "Dashboard"
  );

  // 🔥 LOGIN PAGE
  if (!token) {

    return <Login />;

  }

  // 🔥 ADMIN PANEL
  if (role === "admin") {

    return (

      <div
        style={{
          display: "flex",
          background: "#f1f5f9",
          minHeight: "100vh"
        }}
      >

        {/* SIDEBAR */}
        <div
          style={{
            width: "230px",
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            zIndex: 1000
          }}
        >

          <Sidebar setPage={setPage} />

        </div>

        {/* MAIN CONTENT */}
        <div
          style={{
            flex: 1,
            marginLeft: "270px",
            width: "calc(100% - 250px)"
          }}
        >

          <Topbar page={page} />

          <div
            style={{
              padding: "20px"
            }}
          >

            {page === "Dashboard" &&
              <Dashboard />}

            {page === "Students" &&
              <Students />}

            {page === "Attendance" &&
              <Attendance />}

            {page === "Fees" &&
              <Fees />}

            {page === "Staff" &&
              <Staff />}
              {page === "ApplyRequest" && (
  <ApplyRequest
    setPage={setPage}
  />
)}

          </div>

        </div>

      </div>

    );

  }

// 🔥 STUDENT PANEL
if (role === "student") {

  return (

    <div
      style={{
        padding: "30px",
        background: "#f1f5f9",
        minHeight: "100vh"
      }}
    >

      {page === "StudentDashboard" && (
        <StudentDashboard
          setPage={setPage}
        />
      )}

    {page === "ApplyRequest" && (
  <ApplyRequest
    setPage={setPage}
  />
)}
{page ===
  "AttendanceHistory" && (
  <AttendanceHistory
    setPage={setPage}
  />
)}

    </div>

  );

}
  // 🔥 STAFF PANEL
if (role === "staff") {

  return (

    <StaffDashboard />

  );

} 

  // 🔥 INVALID ROLE
  return (

    <h1
      style={{
        textAlign: "center",
        marginTop: "100px"
      }}
    >
      Unauthorized Access
    </h1>

  );

}

export default App;