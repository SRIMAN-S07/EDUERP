import { useState } from "react";

import Attendance from "./Attendance";
import Fees from "./Fees";
import StaffLeaveRequests
from "./StaffLeaveRequests";

function StaffDashboard() {

  const staff =
    JSON.parse(
      localStorage.getItem("staff")
    );

  const [page, setPage] =
    useState("Attendance");

  return (

    <div
      style={{
        background: "#f1f5f9",
        minHeight: "100vh",
        padding: "30px"
      }}
    >

      {/* TOP */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >

        <div>

          <h1
            style={{
              margin: 0
            }}
          >
            Staff Dashboard
          </h1>

          <p
            style={{
              color: "gray"
            }}
          >
            Manage attendance & fees
          </p>

        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {

            localStorage.clear();

            window.location.reload();

          }}

          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          🚪 Logout
        </button>

      </div>
      <div
  style={{
    background:
      "linear-gradient(135deg,#0ea5e9,#0284c7)",
    color: "white",
    padding: "25px",
    borderRadius: "20px",
    marginBottom: "25px"
  }}
>
  <h2 style={{ margin: 0 }}>
    👋 Welcome Back,
    {staff?.name}
  </h2>

  <p
    style={{
      marginTop: "8px"
    }}
  >
    Manage attendance, fees and
    student requests
  </p>
</div>

      {/* PROFILE CARD */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "18px",
          marginBottom: "25px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.05)"
        }}
      >

        <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "20px"
  }}
>
  <div
    style={{
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: "#0ea5e9",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "30px",
      fontWeight: "bold"
    }}
  >
    {staff?.name?.charAt(0)}
  </div>

  <div>
    <h2
      style={{
        margin: 0
      }}
    >
      {staff?.name}
    </h2>

    <p
      style={{
        color: "gray",
        marginTop: "5px"
      }}
    >
      {staff?.department} Staff
    </p>
  </div>
</div>

        <p>
          <b>Name:</b>
          {" "}
          {staff?.name}
        </p>

        <p>
          <b>Staff ID:</b>
          {" "}
          {staff?.staffId}
        </p>

        <p>
          <b>Department:</b>
          {" "}
          {staff?.department}
        </p>

        <p>
          <b>Subject:</b>
          {" "}
          {staff?.subject}
        </p>

      </div>
       
       <div
  style={{
    display: "flex",
    gap: "20px",
    marginBottom: "25px",
    flexWrap: "wrap"
  }}
>

  <div style={statCard}>
    <h3>👨‍🎓 Students</h3>
    <h1>120</h1>
  </div>

  <div style={statCard}>
    <h3>📝 Requests</h3>
    <h1>15</h1>
  </div>

  <div style={statCard}>
    <h3>💰 Fees</h3>
    <h1>32</h1>
  </div>

</div>
     
      {/* MENU */}
      
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "25px"
        }}
      >

        <button
          onClick={() =>
            setPage("Attendance")
          }

          style={{
            ...menuBtn,
            background:
              page === "Attendance"
                ? "#0ea5e9"
                : "white",

            color:
              page === "Attendance"
                ? "white"
                : "#0f172a"
          }}
        >
          📅 Attendance
        </button>

        <button
          onClick={() =>
            setPage("Fees")
          }

          style={{
            ...menuBtn,
            background:
              page === "Fees"
                ? "#0ea5e9"
                : "white",

            color:
              page === "Fees"
                ? "white"
                : "#0f172a"
          }}
        >
          💰 Fees
        </button>
        <button
  onClick={() =>
    setPage("LeaveRequests")
  }

  style={{
    ...menuBtn,
    background:
      page === "LeaveRequests"
        ? "#0ea5e9"
        : "white",

    color:
      page === "LeaveRequests"
        ? "white"
        : "#0f172a"
  }}
>
  📝 Leave Requests
</button>

      </div>

      {/* CONTENT */}
      <div
      style={{
    background: "white",
    padding: "25px",
    borderRadius: "20px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.05)"
  }}>

        {page === "Attendance" &&
          <Attendance />}

        {page === "Fees" &&
          <Fees />}
          {page === "LeaveRequests" &&
  <StaffLeaveRequests />}

      </div>

    </div>

  );

}
const statCard = {

  background: "white",

  padding: "20px",

  borderRadius: "15px",

  minWidth: "180px",

  flex: 1,

  boxShadow:
    "0 2px 10px rgba(0,0,0,0.05)"
};

const menuBtn = {

  border: "none",

  padding: "12px 20px",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "bold"
};

export default StaffDashboard;