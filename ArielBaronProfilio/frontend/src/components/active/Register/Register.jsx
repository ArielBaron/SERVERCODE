import React, { useState } from "react";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    user_name: "",
    user_age: "",
    birth_date: "",
    user_email: "",
    user_password: "",
    phone_number: "",
    fav_fruit: "",
    include_email: false,
    region: "",
  });

  const [msg, setMsg] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL; // https://localhost:5000

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setMsg(errorText);
        return;
      }

      const data = await res.json(); // assuming backend sends JSON { message: "User registered" }
      setMsg(data.message || "Registration successful!");
    } catch (err) {
      console.error(err);
      setMsg("Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="register-form">
      {msg && <div>{msg}</div>}
      <h2>Register</h2>
      <input
        name="user_name"
        value={form.user_name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="user_age"
        type="number"
        value={form.user_age}
        onChange={handleChange}
        placeholder="Age"
      />
      <input
        name="birth_date"
        type="date"
        value={form.birth_date}
        onChange={handleChange}
        placeholder="Birth Date"
      />
      <input
        name="user_email"
        type="email"
        value={form.user_email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="user_password"
        type="password"
        value={form.user_password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        name="phone_number"
        value={form.phone_number}
        onChange={handleChange}
        placeholder="Phone"
      />
      <label>
        <input
          type="checkbox"
          name="include_email"
          checked={form.include_email}
          onChange={handleChange}
        />
        Include Email Notifications?
      </label>
      <select value={form.region} onChange={handleChange} name="region">
        <option value="">Select Region</option>
        <option value="EU">EU</option>
        <option value="ASIA">ASIA</option>
        <option value="US">US</option>
        <option value="NA">NA</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
