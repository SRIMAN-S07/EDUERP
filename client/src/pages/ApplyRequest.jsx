
  import { useState, useEffect } from "react";

  function ApplyRequest({
    setPage
  }) {
    console.log("setPage =", setPage);
    const student =
      JSON.parse(
        localStorage.getItem("student")
      ) || {};

    const [type, setType] =
      useState("Leave");

    const [reason, setReason] =
      useState("");

    const [fromDate, setFromDate] =
      useState("");

    const [toDate, setToDate] =
      useState("");
      const [requests, setRequests] =
    useState([]);
  const fetchRequests = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/leave"
      );

      const data = await res.json();

      const myRequests =
        data.filter(
          (r) =>
            r.studentId ===
            student.studentId
        );

      setRequests(
        [...myRequests].reverse()
      );

    } catch (err) {

      console.log(err);

    }

  };
  useEffect(() => {

    fetchRequests();

  }, []);

    const handleSubmit = async (e) => {
      
      e.preventDefault();

      try {

        const res = await fetch(
          "http://localhost:5000/leave",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              studentId:
                student.studentId,

              name:
                student.name,

              department:
                student.department,

              type,

              reason,

              fromDate,

              toDate

            })

          }
        );

        if (res.ok) {

          alert(
            "Request Submitted Successfully"
          );
          fetchRequests();

          setReason("");
          setFromDate("");
          setToDate("");

        }

      } catch (err) {

        console.log(err);

        alert(
          "Something went wrong"
        );

      }

    };
    const inputStyle = {
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box"
  };


    return (

      <div 
      style={{
  minHeight: "100vh",
  background: "#f1f5f9",
  padding: "30px"
}} >
          <button
    onClick={() =>
      setPage(
        "StudentDashboard"
      )
    }

    style={{
      background: "#64748b",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      marginBottom: "15px"
    }}
  >
      
    ← Back
    
  </button>

        <div
    style={{
      marginBottom: "25px"
    }}
  >
    <h2
      style={{
        margin: 0,
        color: "#0f172a"
      }}
    >
      📝 Apply Leave / OD
    </h2>

    <p
      style={{
        color: "#64748b",
        marginTop: "8px"
      }}
    >
      Submit your request and track approval status
    </p>
  </div>
     

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: "15px"
          }}
        >

          <select
          style={inputStyle}
            value={type}
            onChange={(e) =>
              setType(
                e.target.value
              )
            }
          >

            <option value="Leave">
              Leave
            </option>

            <option value="OD">
              OD
            </option>

          </select>

          <input
            style={inputStyle}
            type="date"
            value={fromDate}
            onChange={(e) =>
              setFromDate(
                e.target.value
              )
            }
            required
          />

          <input
            style={inputStyle}
            type="date"
            value={toDate}
            onChange={(e) =>
              setToDate(
                e.target.value
              )
            }
            required
          />

          <textarea
            style={inputStyle}
            placeholder="Reason"
            rows="4"
            value={reason}
            onChange={(e) =>
              setReason(
                e.target.value
              )
            }
            required
          />

          <button
            type="submit"
            style={{
              background: "#0f172a",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            Submit Request
          </button>

        </form>
        <hr
    style={{
      margin: "30px 0"
    }}
  />


  <h3
    style={{
      color: "#0f172a",
      marginBottom: "15px"
    }}
  >
    📋 My Requests
  </h3>
  {requests.length === 0 && (

    <div
      style={{
        textAlign: "center",
        padding: "30px",
        color: "#64748b"
      }}
    >
      📭 No requests submitted yet
    </div>

  )}

  {requests.map((r) => (

    <div
      key={r._id}
      style={{
        background: "#fff",
  boxShadow:
    "0 2px 8px rgba(0,0,0,0.05)",
  borderRadius: "12px",
  padding: "15px",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "10px"
      }}
    >

     <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px"
  }}
>
  <h4
    style={{
      margin: 0
    }}
  >
    {r.type === "Leave"
      ? "🌴 Leave Request"
      : "🏫 OD Request"}
  </h4>

  <span
    style={{
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "bold",
      background:
        r.status === "Approved"
          ? "#dcfce7"
          : r.status === "Rejected"
          ? "#fee2e2"
          : "#fef9c3",

      color:
        r.status === "Approved"
          ? "#166534"
          : r.status === "Rejected"
          ? "#991b1b"
          : "#854d0e"
    }}
  >
    {r.status}
  </span>
</div>

<p
  style={{
    margin: "8px 0",
    color: "#475569"
  }}
>
  📅 {r.fromDate} → {r.toDate}
</p>

<p
  style={{
    margin: 0,
    color: "#64748b",
    fontSize: "14px"
  }}
>
  {r.reason}
</p>

    </div>

  ))}

      </div>

    );

  }

  export default ApplyRequest;
