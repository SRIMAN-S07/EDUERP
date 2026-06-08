import { useState, useEffect } from "react";

function Staff() {

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("Professor");

  const [staffs, setStaffs] = useState([]);

  const [search, setSearch] = useState("");

  const [stats, setStats] =
    useState({
      total: 0,
      departments: []
    });

  // FETCH STAFF
  const fetchStaffs = async () => {

    const res = await fetch(
      "http://localhost:5000/staff"
    );

    const data = await res.json();

    setStaffs(data);

  };

  // FETCH STATS
  const fetchStats = async () => {

    const res = await fetch(
      "http://localhost:5000/staff/stats"
    );

    const data = await res.json();

    setStats(data);

  };

  useEffect(() => {

    fetchStaffs();
    fetchStats();

  }, []);

  // SEARCH
  const searchStaff = async () => {

    if (!search) return;

    const res = await fetch(
      `http://localhost:5000/staff/search/${search}`
    );

    const data = await res.json();

    setStaffs(data);

  };

  // ADD STAFF
  const handleSubmit = async (e) => {

    e.preventDefault();

    await fetch(
      "http://localhost:5000/staff",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          name,
          department,
          role
        })
      }
    );

    setName("");
    setDepartment("");
    setRole("Professor");

    fetchStaffs();
    fetchStats();

  };

  // DELETE
  const handleDelete = async (id) => {

    await fetch(
      `http://localhost:5000/staff/${id}`,
      {
        method: "DELETE"
      }
    );

    fetchStaffs();
    fetchStats();

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
          Staff Management
        </h2>

        <p
          style={{
            margin: 0,
            color: "gray"
          }}
        >
          Manage all staff details
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

            placeholder="Search by Staff ID"

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
              border:
                "1px solid #ddd",
              outline: "none"
            }}
          />

          <button
            onClick={searchStaff}

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
              fetchStaffs();
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
              "repeat(auto-fit,minmax(220px,1fr))",

            gap: "15px"
          }}
        >

          <input
            type="text"

            placeholder="Enter Staff Name"

            value={name}

            onChange={(e) =>
              setName(
                e.target.value
              )
            }

            style={inputStyle}
          />

          <select
            value={department}

            onChange={(e) =>
              setDepartment(
                e.target.value
              )
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
            value={role}

            onChange={(e) =>
              setRole(
                e.target.value
              )
            }

            style={inputStyle}
          >

            <option value="Professor">
              Professor
            </option>

            <option value="HOD">
              HOD
            </option>

            <option value="Lab Assistant">
              Lab Assistant
            </option>

          </select>

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
            Add Staff
          </button>

        </form>

      </div>

      {/* STATS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          flexWrap: "wrap"
        }}
      >

        <div style={cardStyle}>
          <h3>Total Staff</h3>
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
            borderCollapse:
              "collapse"
          }}
        >

          <thead>

            <tr
              style={{
                background: "#f1f5f9"
              }}
            >

              <th style={thStyle}>
                Staff ID
              </th>

              <th style={thStyle}>
                Name
              </th>

              <th style={thStyle}>
                Department
              </th>

              <th style={thStyle}>
                Role
              </th>

              <th style={thStyle}>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {staffs.map((s, index) => (

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
                  {s.staffId}
                </td>

                <td style={tdStyle}>
                  {s.name}
                </td>

                <td style={tdStyle}>
                  {s.department}
                </td>

                <td style={tdStyle}>
                  {s.role}
                </td>

                <td style={tdStyle}>

                  <button
                    onClick={() =>
                      handleDelete(s._id)
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

export default Staff;