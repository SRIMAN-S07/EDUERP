import { useEffect, useState } from "react";

function StudentDashboard({
  setPage
}) {

  const student =
    JSON.parse(
      localStorage.getItem("student")
    ) || {};

  const [attendancePercent,
    setAttendancePercent] =
    useState(0);
    

  const [feesStatus,
    setFeesStatus] =
    useState("Pending");
    
 

  useEffect(() => {

  const loadData = async () => {

    await fetchAttendance();

    await fetchFees();

  };

  loadData();

}, []);

  const fetchAttendance =
    async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/attendance"
        );

        const data =
          await res.json();

        const records =
          data.filter(
            (a) =>
              a.studentId ===
              student.studentId
          );
        

        const present =
          records.filter(
            (a) =>
              a.status === "Present"
          ).length;

        const percentage =
          records.length > 0
            ? Math.round(
                (present /
                  records.length) *
                  100
              )
            : 0;
            

        setAttendancePercent(
          percentage
        );

      } catch (err) {

        console.log(err);

      }

    };

  const fetchFees =
    async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/fees"
        );

        const data =
          await res.json();

        const studentFees =
          data.filter(
            (f) =>
              f.studentId ===
              student.studentId
          );

        

        if (
          studentFees.length > 0
        ) {

          const latest =
            studentFees[
              studentFees.length - 1
            ];

          setFeesStatus(
            latest.status
          );
 
  

        }

      } catch (err) {

        console.log(err);

      }

    };

  return (

    <div
      style={{
        padding: "30px",
        background: "#f1f5f9",
        minHeight: "100vh"
      }}
    >
      <button
  onClick={() =>
    setPage("ApplyRequest")
  }
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "20px"
  }}
>
  Apply Leave / OD
</button>
<button
  onClick={() =>
    setPage("AttendanceHistory")
  }
  style={{
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    marginLeft: "10px"
  }}
>
  Attendance History
</button>

      {/* HEADER */}
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
              margin: 0,
              color: "#0f172a",
              fontSize: "32px"
            }}
          >
            🎓 Student Dashboard
          </h1>

          <p
            style={{
              color: "#64748b"
            }}
          >
            Welcome back, {student?.name}
          </p>

        </div>

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

      {/* PROFILE */}
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.05)",
          marginBottom: "25px"
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px"
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
              fontSize: "28px",
              fontWeight: "bold"
            }}
          >
            {student?.name?.charAt(0)}
          </div>

          <div>

            <h2
              style={{
                margin: 0
              }}
            >
              {student?.name}
            </h2>

            <p
              style={{
                margin: "5px 0",
                color: "gray"
              }}
            >
              {student?.studentId}
            </p>

            <p
              style={{
                margin: 0,
                color: "gray"
              }}
            >
              {student?.department}
            </p>

          </div>

        </div>

      </div>

      {/* STATS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >

       <div style={cardStyle}>

  <div
    style={{
      fontSize: "40px"
    }}
  >
    📊
  </div>

  <h3>Attendance</h3>

  <h1
    style={{
      color:
        attendancePercent >= 75
          ? "#22c55e"
          : "#ef4444",
      margin: 0
    }}
  >
    {attendancePercent}%
  </h1>

</div>
   <div style={cardStyle}>

  <div
    style={{
      fontSize: "40px"
    }}
  >
    💳
  </div>

  <h3>Fees Status</h3>

  <h1
    style={{
      color:
        feesStatus === "Paid"
          ? "#22c55e"
          : "#ef4444",
      margin: 0
    }}
  >
    {feesStatus}
  </h1>

</div>

      </div>
      
</div>
 );
}

const cardStyle = {

  background: "white",

  padding: "25px",

  borderRadius: "20px",

  minWidth: "250px",

  flex: 1,

  textAlign: "center",

  transition: "0.3s",

  boxShadow:
    "0 8px 20px rgba(0,0,0,0.08)"

};

export default StudentDashboard;