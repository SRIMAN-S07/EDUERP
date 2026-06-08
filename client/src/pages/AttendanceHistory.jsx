import { useEffect, useState } from "react";

function AttendanceHistory({
  setPage
}) {

  const student =
    JSON.parse(
      localStorage.getItem("student")
    ) || {};

  const [records,
    setRecords] =
    useState([]);

  useEffect(() => {

    fetchAttendance();

  }, []);

  const fetchAttendance =
    async () => {

      try {

        const res =
          await fetch(
            "http://localhost:5000/attendance"
          );

        const data =
          await res.json();

        const myRecords =
          data.filter(
            (a) =>
              a.studentId ===
              student.studentId
          );

        setRecords(
          myRecords.reverse()
        );

      } catch (err) {

        console.log(err);

      }

    };

  return (

    <div
      style={{
        padding: "30px",
         minHeight: "100vh",
    background: "#f1f5f9"
      }}
    >

      <button
  onClick={() =>
    setPage(
      "StudentDashboard"
    )
  }
  style={{
    background: "white",
    color: "#0f172a",
    border: "none",
    padding: "10px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: "20px"
  }}
>
  ← Back to Dashboard
</button>

      <div
  style={{
    background: "white",
    padding: "25px",
    borderRadius: "20px",
    marginBottom: "20px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.05)"
  }}
>
  <h2>
    📊 Attendance History
  </h2>

  <p>
    View your attendance records
  </p>
</div>

      <div
  style={{
    marginTop: "20px"
  }}
>

  {records.length === 0 && (

    <div
      style={{
        textAlign: "center",
        background: "white",
        padding: "30px",
        borderRadius: "15px"
      }}
    >
      📭 No Attendance Records Found
    </div>

  )}

  {records.map((r) => (

    <div
      key={r._id}
      style={{
        background: "white",
        padding: "15px",
        marginBottom: "12px",
        borderRadius: "12px",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.05)",

        borderLeft:
          r.status === "Present"
            ? "5px solid #22c55e"
            : r.status === "Absent"
            ? "5px solid #ef4444"
            : r.status === "Leave"
            ? "5px solid #eab308"
            : "5px solid #94a3b8",

        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center"
      }}
    >

      <div>

        <h4
          style={{
            margin: 0
          }}
        >
          📅 {r.date}
        </h4>

      </div>

      <span
        style={{
          padding: "6px 12px",
          borderRadius: "20px",
          fontWeight: "bold",

          background:
            r.status === "Present"
              ? "#dcfce7"
              : r.status === "Absent"
              ? "#fee2e2"
              : r.status === "Leave"
              ? "#fef9c3"
              : "#e2e8f0",

          color:
            r.status === "Present"
              ? "#166534"
              : r.status === "Absent"
              ? "#991b1b"
              : r.status === "Leave"
              ? "#854d0e"
              : "#475569"
        }}
      >
        {r.status}
      </span>

    </div>

  ))}

</div>

    </div>

  );

}

export default AttendanceHistory;