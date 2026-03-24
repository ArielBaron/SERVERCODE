import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  // State placeholders
  const [email, setEmail] = useState(""); // previously Request.Form.Get("email")
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(""); // previously <%= msg %>

  const apiUrl = import.meta.env.VITE_API_URL; // https://localhost:5000

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: email, user_password: password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setMsg(errorText);
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token); // store JWT for future requests
      setMsg("Login successful!");
      window.location.href = "/home"
    } catch (err) {
      console.error(err);
      setMsg("Login failed");
    }
  };

  return (
    <div>
      {/* Message placeholder */}
      {msg && <div>{msg}</div>}

      <form onSubmit={handleLogin}>
        <input
          required
          type="emaill"
          name="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          required
          type="password"
          name="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" id="login" value="login" />
      </form>

      <a href="/register">Don't have an account? Register here!</a>
    </div>
  );
}
