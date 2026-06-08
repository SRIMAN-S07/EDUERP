function Topbar({ page }) {

  return (

    <div
      style={{
        height: "70px",

        background: "white",

        display: "flex",

        justifyContent:
          "space-between",

        alignItems: "center",

        padding: "0 30px",

        boxShadow:
          "0 2px 10px rgba(0,0,0,0.05)",

        position: "sticky",

        top: 0,

        zIndex: 100
      }}
    >

      {/* LEFT */}
      <div>

        <h2
          style={{
            margin: 0,
            color: "#0f172a"
          }}
        >
          {page}
        </h2>

        <p
          style={{
            margin: 0,
            color: "gray",
            fontSize: "14px"
          }}
        >
          Welcome back 👋
        </p>

      </div>

      {/* RIGHT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px"
        }}
      >

        {/* SEARCH */}
        <div
          style={{
            display: "flex",
            alignItems: "center",

            background: "#f1f5f9",

            padding:
              "10px 15px",

            borderRadius: "12px"
          }}
        >

          <span>🔍</span>

          <input
            type="text"

            placeholder="Search..."

            style={{
              border: "none",

              outline: "none",

              background:
                "transparent",

              marginLeft: "10px"
            }}
          />

        </div>

        {/* BELL */}
        <div
          style={{
            fontSize: "22px",
            cursor: "pointer"
          }}
        >
          🔔
        </div>

        {/* PROFILE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >

          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#0ea5e9",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold"
            }}
          >
            A
          </div>

          <div>

            <div
              style={{
                fontWeight: "bold"
              }}
            >
              Admin
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "gray"
              }}
            >
              ERP Manager
            </div>

          </div>

        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {

            localStorage.clear();

            window.location.reload();

          }}

          style={{
            background: "#ef4444",

            color: "white",

            border: "none",

            padding: "10px 14px",

            borderRadius: "10px",

            cursor: "pointer",

            fontWeight: "bold"
          }}
        >
          🚪 Logout
        </button>

      </div>

    </div>

  );
}

export default Topbar;