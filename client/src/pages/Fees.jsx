import { useState, useEffect } from "react";

function Fees() {

  const [studentId, setStudentId] =
    useState("");

  const [name, setName] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [status, setStatus] =
    useState("Paid");

  const [fees, setFees] =
    useState([]);
    const staff =
  JSON.parse(
    localStorage.getItem("staff")
  ) || {};

  // FETCH FEES
  
const fetchFees = async () => {

  try {

    const res = await fetch(
      "http://localhost:5000/fees"
    );

    const data = await res.json();
    console.log("Staff =>", staff);

console.log("Department =>", staff?.department);

console.log("Fees Data =>", data);
console.log("Staff:", staff);

console.log("All Fees:", data);

console.log(
  "Filtered:",
  data.filter(
    (f) =>
      f.department ===
      staff.department
  )
);

    if (staff?.department) {

      const filtered =
        data.filter(
          (f) =>
            f.department ===
            staff.department
        );

      setFees(filtered);

    } else {

      setFees(data);

    }

  } catch (err) {

    console.log(err);
    

  }

};

useEffect(() => {

  fetchFees();

}, []);



  // FETCH STUDENT
const fetchStudent = async () => {

  if (!studentId) return;

  try {

    const res = await fetch(
      `http://localhost:5000/students/find/${studentId}`
    );

    const data = await res.json();

    if (!data) {

      alert("Student Not Found");
      return;

    }

    if (
      staff?.department &&
      data.department !== staff.department
    ) {

      alert(
        "You can only access students from your department"
      );

      return;

    }

    setName(data.name);

    setDepartment(data.department);

  } catch (err) {

    console.log(err);

  }

};

  // ADD FEES
  const handleSubmit = async (e) => {

    e.preventDefault();

    await fetch(
      "http://localhost:5000/fees",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          studentId,
          name,
          department,
          amount,
          status
        })
      }
    );

    setStudentId("");
    setName("");
    setDepartment("");
    setAmount("");

    fetchFees();

  };

  // DELETE
  const handleDelete = async (id) => {

    await fetch(
      `http://localhost:5000/fees/${id}`,
      {
        method: "DELETE"
      }
    );

    fetchFees();

  };

  return (

    <div>

      {/* HEADER */}
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
          💰 Fees Management
        </h2>

        <p
          style={{
            margin: 0,
            color: "gray"
          }}
        >
          Manage student fees records
        </p>

      </div>

      {/* FORM */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.05)",
          marginBottom: "25px"
        }}
      >

        <form
           onSubmit={handleSubmit}
  style={{
    display: "grid",
    gap: "15px"
  }}
        >

          {/* STUDENT ID */}
    <div>

  <input
    type="text"
    placeholder="Enter Student ID"
    value={studentId}
    onChange={(e) =>
      setStudentId(e.target.value)
    }
    style={{
      ...inputStyle,
      width: "100%",
      marginBottom: "10px"
    }}
  />

  <button
    type="button"
    onClick={fetchStudent}
    style={{
      background: "#0ea5e9",
      color: "white",
      border: "none",
      borderRadius: "10px",
      padding: "10px 15px",
      cursor: "pointer",
      width: "100%"
    }}
  >
    🔍 Fetch Student
  </button>

</div>

          {/* NAME */}
          <input
            type="text"

            value={name}

            placeholder="Student Name"

            readOnly

            style={inputStyle}
          />

          {/* DEPARTMENT */}
          <input
            type="text"

            value={department}

            placeholder="Department"

            readOnly

            style={inputStyle}
          />

          {/* AMOUNT */}
          <input
            type="number"

            placeholder="Fees Amount"

            value={amount}

            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }

            style={inputStyle}
          />

          {/* STATUS */}
          <select
            value={status}

            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }

            style={inputStyle}
          >

            <option value="Paid">
              Paid
            </option>

            <option value="Pending">
              Pending
            </option>

          </select>

          {/* BUTTON */}
          <button
            type="submit"

            style={{
              background: "#0f172a",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "12px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
          💰  Add Fees
          </button>

        </form>

      </div>

      {/* TABLE */}
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "20px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.05)",
          overflowX: "auto"
        }}
      >
        <h3>Total Fees Records: {fees.length}</h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >

          <thead>

            <tr
              style={{
                background: "#f1f5f9"
              }}
            >

              <th style={thStyle}>
                Student ID
              </th>

              <th style={thStyle}>
                Name
              </th>

              <th style={thStyle}>
                Department
              </th>

              <th style={thStyle}>
                Amount
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

            {fees.map((f, index) => (

              <tr
                key={f._id}

                style={{
                  background:
                    index % 2 === 0
                      ? "#fff"
                      : "#f8fafc"
                }}
              >

                <td style={tdStyle}>
                  {f.studentId}
                </td>

                <td style={tdStyle}>
                  {f.name}
                </td>

                <td style={tdStyle}>
                  {f.department}
                </td>

                <td style={tdStyle}>
                  ₹ {f.amount}
                </td>

                <td style={tdStyle}>

                  <span
                    style={{
                      background:
                        f.status === "Paid"
                          ? "#dcfce7"
                          : "#fef3c7",

                      color:
                        f.status === "Paid"
                          ? "#166534"
                          : "#92400e",

                      padding:
                        "6px 12px",

                      borderRadius:
                        "20px",

                      fontSize: "14px",

                      fontWeight: "bold"
                    }}
                  >
                    {f.status}
                  </span>

                </td>

                <td style={tdStyle}>

                  <button
                    onClick={() =>
                      handleDelete(f._id)
                    }

                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding:
                        "8px 14px",

                      borderRadius: "8px",

                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

// STYLES
const inputStyle = {

  padding: "12px",

  borderRadius: "10px",

  border: "1px solid #ddd",

  outline: "none"

};

const thStyle = {

  padding: "15px",

  textAlign: "left",

  color: "#0f172a"

};

const tdStyle = {

  padding: "15px"

};

export default Fees;