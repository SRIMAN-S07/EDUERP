import { useState, useEffect } from "react";

function Attendance() {

  const [studentId, setStudentId] =
    useState("");

  const [name, setName] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [status, setStatus] =
    useState("Present");

  const [attendance, setAttendance] =
    useState([]);

  const staff =
    JSON.parse(
      localStorage.getItem("staff")
    ) || {};
    const inputStyle = {
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  fontSize: "15px",
  width: "100%",
  boxSizing: "border-box"
};

  // FETCH ATTENDANCE
  const fetchAttendance = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/attendance"
      );

      const data = await res.json();

      if (staff?.department) {

        const filtered =
          data.filter(
            (a) =>
              a.department ===
              staff.department
          );

        setAttendance(filtered);

      } else {

        setAttendance(data);

      }

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchAttendance();

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

  // ADD ATTENDANCE
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await fetch(
        "http://localhost:5000/attendance",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            studentId,
            name,
            department,
            status
          })
        }
      );

      setStudentId("");
      setName("");
      setDepartment("");
      setStatus("Present");

      fetchAttendance();

    } catch (err) {

      console.log(err);

    }

  };

  // DELETE
  const handleDelete = async (id) => {

    try {

      await fetch(
        `http://localhost:5000/attendance/${id}`,
        {
          method: "DELETE"
        }
      );

      fetchAttendance();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div
     style={{
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  }}>

      <h2
  style={{
    marginTop: 0,
    marginBottom: "20px"
  }}
>
  📋 Attendance Management
</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "10px",
          marginBottom: "20px"
        }}
      >

        <input
        style={inputStyle}
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) =>
            setStudentId(
              e.target.value
            )
          }
        />

       <button
  type="button"
  onClick={fetchStudent}
  style={{
    background: "#0ea5e9",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  🔍 Fetch Student
</button>

        <input
        style={inputStyle}
          type="text"
          value={name}
          readOnly
          placeholder="Student Name"
        />

        <input
        style={inputStyle}
          type="text"
          value={department}
          readOnly
          placeholder="Department"
        />

        <select
        style={inputStyle}
        type="text"
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
        >
          <option value="Present">
            Present
          </option>

          <option value="Absent">
            Absent
          </option>
        </select>

        <button
  type="submit"
  style={{
    background: "#0f172a",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  ✅ Mark Attendance
</button>

      </form>
      <h3
  style={{
    marginBottom: "15px"
  }}
>
  📋 Attendance Records
</h3>

      <table
         style={{
    width: "100%",
    borderCollapse: "collapse",
    background: "white"
  }}    
      >

        <thead>
  <tr
    style={{
      background: "#f8fafc",
      borderBottom: "2px solid #e2e8f0"
    }}
  ></tr>

          <tr>

            <th style={thStyle}>Student ID</th>

            <th style={thStyle}>Name</th>

            <th style={thStyle}>Department</th>

            <th style={thStyle}>Status</th>

            <th style={thStyle}>Date</th>

            <th style={thStyle}>Action</th>

          </tr>

        </thead>

        <tbody>

          {attendance.map((a) => (

            <tr  key={a._id}
  style={{
    borderBottom: "1px solid #e5e7eb"
  }}>

              <td>{a.studentId}</td>

              <td>{a.name}</td>

              <td>{a.department}</td>

              <td style={tdStyle}>
  <span
    style={{
      padding: "5px 12px",
      borderRadius: "20px",
      fontWeight: "bold",
      background:
        a.status === "Present"
          ? "#dcfce7"
          : "#fee2e2",

      color:
        a.status === "Present"
          ? "#166534"
          : "#991b1b"
    }}
  >
    {a.status}
  </span>
</td>

              <td>
                {a.date
                  ? new Date(
                      a.date
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td>

                <button
  onClick={() =>
    handleDelete(a._id)
  }
  style={{
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 12px",
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

  );

}
const thStyle = {
  padding: "15px",
  textAlign: "left",
  fontWeight: "600",
  color: "#475569"
};

const tdStyle = {
  padding: "15px",
  color: "#0f172a"
};

export default Attendance;