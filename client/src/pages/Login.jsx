import { useState } from "react";

function Login() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            username,
            password
          })
        }
      );

      const data =
        await res.json();

      if (res.ok) {

        // SAVE TOKEN
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "role",
          data.role
        );
        if (data.staff) {

  localStorage.setItem(
    "staff",
    JSON.stringify(data.staff)
  );

}

if (data.student) {

  localStorage.setItem(
    "student",
    JSON.stringify(data.student)
  );

}
       window.location.reload();

      } else {

        setError(data.error);

      }

    } catch (err) {

      setError("Server Error");

    }

  };

  return (

    <div
      style={{
        height: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background:
          "linear-gradient(to right,#0f172a,#1e293b)"
      }}
    >

      <div
        style={{
          background: "white",

          padding: "40px",

          borderRadius: "20px",

          width: "350px",

          boxShadow:
            "0 0 30px rgba(0,0,0,0.3)"
        }}
      >
      <div
  style={{
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "#0ea5e9",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    margin: "0 auto 20px"
  }}
>
  🎓
</div>
       <h1>Welcome Back 👋</h1>

<p>
Login to continue to EduERP
</p>

        <form
          onSubmit={handleLogin}
        >

          <input
            type="text"
            

            placeholder="Username"

            value={username}

            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }

            style={inputStyle }
          />

          <input
            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            style={inputStyle}
          />

          <button
            type="submit"

            style={{
              width: "100%",

              padding: "14px",

              background: "#0f172a",

              color: "white",

              border: "none",

              borderRadius: "10px",

              fontWeight: "bold",

              cursor: "pointer"
            }}
          >
            Login
          </button>

        </form>

        {error && (

          <p
            style={{
              color: "red",

              marginTop: "15px",

              textAlign: "center"
            }}
          >
            {error}
          </p>

        )}

      </div>

    </div>

  );

}

const inputStyle = {

  width: "100%",

  padding: "14px",

  marginBottom: "15px",

  borderRadius: "10px",

  border: "1px solid #ddd",

  outline: "none",

  boxSizing: "border-box"
};

export default Login;