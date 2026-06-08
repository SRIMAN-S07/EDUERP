import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { useEffect, useState } from "react";

function Dashboard() {

  const [stats, setStats] = useState({
    total: 0,
    departments: []
  });

  const [recentStudents, setRecentStudents] =
    useState([]);

  // FETCH STATS
  const fetchStats = async () => {

    const res = await fetch(
      "http://localhost:5000/students/stats"
    );

    const data = await res.json();

    setStats(data);
  };

  // FETCH RECENT
  const fetchRecent = async () => {

    const res = await fetch(
      "http://localhost:5000/students/recent"
    );

    const data = await res.json();

    setRecentStudents(data);
  };

  useEffect(() => {

    fetchStats();
    fetchRecent();

  }, []);

  const COLORS = [
    "#38bdf8",
    "#818cf8",
    "#34d399",
    "#f472b6"
  ];

  return (

    <div>

      {/* TITLE */}
      <div
        style={{
          marginBottom: "30px"
        }}
      >

        <h1
          style={{
            margin: 0,
            color: "#0f172a"
          }}
        >
          Dashboard Overview
        </h1>

        <p
          style={{
            color: "gray"
          }}
        >
          Welcome to EduERP 🚀
        </p>

      </div>

      {/* CARDS */}
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",

          gap: "20px",

          marginBottom: "30px"
        }}
      >

        {/* CARD */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#0ea5e9,#2563eb)",

            padding: "25px",

            borderRadius: "20px",

            color: "white",

            boxShadow:
              "0 10px 25px rgba(0,0,0,0.1)"
          }}
        >

          <h3>Total Students</h3>

          <h1>{stats.total}</h1>

        </div>

        {/* CARD */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#8b5cf6,#6366f1)",

            padding: "25px",

            borderRadius: "20px",

            color: "white",

            boxShadow:
              "0 10px 25px rgba(0,0,0,0.1)"
          }}
        >

          <h3>Attendance</h3>

          <h1>86%</h1>

        </div>

        {/* CARD */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#10b981,#059669)",

            padding: "25px",

            borderRadius: "20px",

            color: "white",

            boxShadow:
              "0 10px 25px rgba(0,0,0,0.1)"
          }}
        >

          <h3>Fees Collected</h3>

          <h1>₹1.2L</h1>

        </div>

      </div>

      {/* CHART + RECENT */}
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "1fr 1fr",

          gap: "20px"
        }}
      >

        {/* PIE CHART */}
        <div
          style={{
            background: "white",

            borderRadius: "20px",

            padding: "20px",

            boxShadow:
              "0 5px 15px rgba(0,0,0,0.05)"
          }}
        >

          <h3>
            Department Analytics
          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={stats.departments}

                dataKey="count"

                nameKey="_id"

                outerRadius={100}

                label
              >

                {stats.departments.map(
                  (entry, index) => (

                    <Cell
                      key={index}

                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* RECENT STUDENTS */}
        <div
          style={{
            background: "white",

            borderRadius: "20px",

            padding: "20px",

            boxShadow:
              "0 5px 15px rgba(0,0,0,0.05)"
          }}
        >

          <h3>
            Recent Students
          </h3>

          {recentStudents.map((s) => (

            <div
              key={s._id}

              style={{
                display: "flex",

                justifyContent:
                  "space-between",

                padding: "12px 0",

                borderBottom:
                  "1px solid #eee"
              }}
            >

              <div>

                <div
                  style={{
                    fontWeight: "bold"
                  }}
                >
                  {s.name}
                </div>

                <div
                  style={{
                    color: "gray",
                    fontSize: "14px"
                  }}
                >
                  {s.department}
                </div>

              </div>

              <div
                style={{
                  color: "#0ea5e9",
                  fontWeight: "bold"
                }}
              >
                {s.studentId}
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;