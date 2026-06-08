import { useState, useEffect } from "react";

function Students() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");

  const [students, setStudents] = useState([]);

  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");

  const [type, setType] = useState("U");

  const [year, setYear] = useState("23");

  const [stats, setStats] = useState({
    total: 0,
    departments: []
  });

  // 🔥 FETCH STUDENTS
  const fetchStudents = async () => {

    const res = await fetch(
      "http://localhost:5000/students"
    );

    const data = await res.json();

    setStudents(data);
  };

  // 🔥 FETCH STATS
  const fetchStats = async () => {

    const res = await fetch(
      "http://localhost:5000/students/stats"
    );

    const data = await res.json();

    setStats(data);
  };

  // 🔥 PAGE LOAD
  useEffect(() => {

    fetchStudents();

    fetchStats();

  }, []);

  // 🔥 SEARCH
  const searchStudent = async () => {

    if (!search) return;

    const res = await fetch(
      `http://localhost:5000/students/search/${search}`
    );

    const data = await res.json();

    setStudents(data);
  };

  // 🔥 ADD / UPDATE
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!name) return;

    if (editId) {

      // UPDATE
      await fetch(
        `http://localhost:5000/students/${editId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            age,
            department,
            year,
            type
          })
        }
      );

      setEditId(null);

    } else {

      // ADD
      await fetch(
        "http://localhost:5000/students",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            age,
            department,
            year,
            type
          })
        }
      );
    }

    // CLEAR
    setName("");
    setAge("");
    setDepartment("");

    fetchStudents();

    fetchStats();
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {

    await fetch(
      `http://localhost:5000/students/${id}`,
      {
        method: "DELETE"
      }
    );

    fetchStudents();

    fetchStats();
  };

  // 🔥 EDIT
  const handleEdit = (student) => {

    setName(student.name);

    setAge(student.age);

    setDepartment(student.department);

    setEditId(student._id);
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
          Students Management
        </h2>

        <p
          style={{
            color: "gray"
          }}
        >
          Manage all students details
        </p>

      </div>

      {/* SEARCH */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.05)",
          marginBottom: "20px"
        }}
      >

        <div
          style={{
            display: "flex",
            gap: "10px"
          }}
        >

          <input
            type="text"

            placeholder="Search by Student ID"

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              outline: "none"
            }}
          />

          <button
            onClick={searchStudent}

            style={{
              background: "#0ea5e9",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            Search
          </button>

          <button
            onClick={() => {
              fetchStudents();
              fetchStats();
            }}

            style={{
              background: "#334155",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            Show All
          </button>

        </div>

      </div>

      {/* FORM */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.05)",
          marginBottom: "20px"
        }}
      >

        <form
          onSubmit={handleSubmit}

          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",

            gap: "15px"
          }}
        >

          <input
            type="text"

            placeholder="Enter Name"

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

            style={inputStyle}
          />

          <input
            type="number"

            placeholder="Enter Age"

            value={age}

            onChange={(e) =>
              setAge(e.target.value)
            }

            style={inputStyle}
          />

          <select
            value={department}

            onChange={(e) =>
              setDepartment(e.target.value)
            }

            style={inputStyle}
          >

            <option value="">
              Select Department
            </option>

            <option value="CSC">
              CSC
            </option>

            <option value="BCA">
              BCA
            </option>

            <option value="BTH">
              BTH
            </option>

          </select>

          <select
            value={type}

            onChange={(e) =>
              setType(e.target.value)
            }

            style={inputStyle}
          >

            <option value="U">
              UG
            </option>

            <option value="P">
              PG
            </option>

          </select>

          <input
            type="text"

            placeholder="Year"

            value={year}

            onChange={(e) =>
              setYear(e.target.value)
            }

            style={inputStyle}
          />

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
            {editId
              ? "Update"
              : "Add Student"}
          </button>

        </form>

      </div>

      {/* STATS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "20px"
        }}
      >

        <div style={cardStyle}>

          <h3>Total Students</h3>

          <h1>{stats.total}</h1>

        </div>

        {stats.departments.map((dept) => (

          <div
            key={dept._id}
            style={cardStyle}
          >

            <h3>{dept._id}</h3>

            <h1>{dept.count}</h1>

          </div>

        ))}

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
                Age
              </th>

              <th style={thStyle}>
                Department
              </th>

              <th style={thStyle}>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {students.map((s, index) => (

              <tr
                key={s._id}

                style={{
                  background:
                    index % 2 === 0
                      ? "#fff"
                      : "#f8fafc"
                }}
              >

                <td style={tdStyle}>
                  {s.studentId}
                </td>

                <td style={tdStyle}>
                  {s.name}
                </td>

                <td style={tdStyle}>
                  {s.age}
                </td>

                <td style={tdStyle}>
                  {s.department}
                </td>

                <td style={tdStyle}>

                  <button
                    onClick={() =>
                      handleEdit(s)
                    }

                    style={{
                      background: "#0ea5e9",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      marginRight: "10px",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(s._id)
                    }

                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
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

// 🔥 STYLES
const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  outline: "none"
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "16px",
  flex: 1,
  minWidth: "180px",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.05)"
};

const thStyle = {
  padding: "15px",
  textAlign: "left",
  color: "#0f172a"
};

const tdStyle = {
  padding: "15px"
};

export default Students;