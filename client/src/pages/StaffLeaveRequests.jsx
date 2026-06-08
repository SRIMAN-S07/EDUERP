import { useEffect, useState } from "react";

function StaffLeaveRequests() {

  const [requests, setRequests] =
    useState([]);

  const staff =
    JSON.parse(
      localStorage.getItem("staff")
    ) || {};

  useEffect(() => {

    fetchRequests();

  }, []);

  const fetchRequests =
    async () => {

      try {

        const res =
          await fetch(
            "http://localhost:5000/leave"
          );

        const data =
          await res.json();

        const filtered =
          data.filter(
            (r) =>
              r.department ===
              staff.department
          );

        setRequests(
          filtered
        );

      } catch (err) {

        console.log(err);

      }

    };

  const updateStatus =
    async (
      id,
      status
    ) => {

      try {

        await fetch(
          `http://localhost:5000/leave/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({
                status
              })

          }
        );

        fetchRequests();

      } catch (err) {

        console.log(err);

      }

    };

  return (

    <div>

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
    📝 Leave / OD Requests
  </h2>

  <p
    style={{
      color: "#64748b",
      marginTop: "8px"
    }}
  >
    Review and manage student requests
  </p>
</div>
<div
  style={{
    background: "white",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.05)"
  }}
>
      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse"
        }}
      >

        <thead>

          <tr>

            <th style={thStyle}>
              Student ID
            </th>

            <th style={thStyle}>
              Name
            </th>

            <th style={thStyle}>
              Type
            </th>

            <th style={thStyle}>
              From
            </th>

            <th style={thStyle}>
              To
            </th>

            <th style={thStyle}>
              Status
            </th>

            <th style={thStyle}>
              Action
            </th>

          </tr>

        </thead>

        <tbody>
          {requests.length === 0 && (
  <tr>
    <td
      colSpan="7"
      style={{
        textAlign: "center",
        padding: "30px",
        color: "#64748b"
      }}
    >
      📭 No Leave Requests Found
    </td>
  </tr>
)}

          {requests.map(
            (r) => (

              <tr
                key={r._id}
              >

                <td style={tdStyle}>
                  {r.studentId}
                </td>

                <td style={tdStyle}>
                  {r.name}
                </td>

                <td style={tdStyle}>
                  {r.type}
                </td>

                <td style={tdStyle}>
                  {r.fromDate}
                </td>

                <td style={tdStyle}>
                  {r.toDate}
                </td>

                <td style={tdStyle}>
  <span
    style={{
      padding: "6px 12px",
      borderRadius: "20px",
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
</td>

                <td style={tdStyle}>

                  {r.status ===
                  "Pending" ? (

                    <>

                     <button
  onClick={() =>
    updateStatus(
      r._id,
      "Approved"
    )
  }
  style={{
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  ✓ Approve
</button>

                      <button
                        onClick={() =>
                          updateStatus(
                            r._id,
                            "Rejected"
                          )
                        }
                        style={{
                         marginLeft: "10px",
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
                        }}
                      >
                        
                        ✕ Reject
                      </button>

                    </>

                  ) : (

                    r.status

                  )}

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>
      </div>


    </div>

  );

}

const thStyle = {

  padding: "12px",

  textAlign: "left",

  borderBottom:
    "1px solid #ddd"

};

const tdStyle = {

  padding: "12px",

  borderBottom:
    "1px solid #eee"

};

export default
  StaffLeaveRequests;