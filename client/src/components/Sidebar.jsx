function Sidebar({ setPage }) {

  const menus = [
    {
      name: "Dashboard",
      icon: "📊"
    },

    {
      name: "Students",
      icon: "🎓"
    },

    {
      name: "Attendance",
      icon: "📅"
    },

    {
      name: "Fees",
      icon: "💰"
    },

    {
      name: "Staff",
      icon: "👨‍🏫"
    }
  ];

  return (

    <div
      style={{
        width: "240px",
        height: "100vh",

        background:
          "linear-gradient(to bottom, #0f172a, #1e293b)",

        color: "white",

        padding: "20px",

        position: "fixed",

        left: 0,
        top: 0,

        boxShadow:
          "0 0 20px rgba(0,0,0,0.3)"
      }}
    >

      <h1
        style={{
          textAlign: "center",

          marginBottom: "40px",

          color: "#38bdf8"
        }}
      >
        EduERP
      </h1>

      {menus.map((menu) => (

        <div
          key={menu.name}

          onClick={() =>
            setPage(menu.name)
          }

          style={{
            display: "flex",

            alignItems: "center",

            gap: "12px",

            padding: "14px",

            marginBottom: "10px",

            borderRadius: "12px",

            cursor: "pointer",

            background:
              "rgba(255,255,255,0.05)",

            transition: "0.3s"
          }}
        >

          <span
            style={{
              fontSize: "20px"
            }}
          >
            {menu.icon}
          </span>

          <span>{menu.name}</span>

        </div>

      ))}

    </div>
  );
}

export default Sidebar;