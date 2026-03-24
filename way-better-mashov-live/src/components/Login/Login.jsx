import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [semel, setSemel] = useState("");
  const [password, setPassword] = useState("");
  const [userClass, setUserClass] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const inputs = JSON.parse(e.target.result);
        setId(inputs.ID || "");
        setSemel(inputs.SEMEL || "");
        setPassword(inputs.PASSWORD || "");
        setUserClass(inputs.CLASS || "");
      };
      reader.readAsText(file);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const loginData = {
      ACTION: "MASHOV", // <-- needed by your backend
      ID: id,
      SEMEL: semel,
      PASSWORD: password,
      CLASS: userClass,
    };
    console.log(loginData);

    try {
      const response = await fetch("https://arielbaron.dpdns.org/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) throw new Error("Login failed");
      const tables = await response.json();
      setIsLoggedIn(true);
      localStorage.setItem("tables", JSON.stringify(tables));
      console.log(localStorage.getItem("tables"));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(
        "Failed to fetch data. Check your credentials or server configuration."
      );
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <img src="EduSphereLogo.png" alt="EduSphere Logo" className="logo" />
        <h1>Login</h1>
        <input
          type="file"
          className="file-input"
          onChange={handleFileChange}
          accept=".txt, .json"
        />
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="ID Number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="text"
            placeholder="School Semel"
            value={semel}
            onChange={(e) => setSemel(e.target.value)}
          />
          <input
            type="text"
            placeholder="Class"
            value={userClass}
            onChange={(e) => setUserClass(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mashov Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <a href="/" className="back-home">
          ← Back to Home
        </a>
      </div>
    </div>
  );
}

export default Login;

