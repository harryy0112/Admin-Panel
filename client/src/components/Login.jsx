import axios from "axios";
import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    try {
      const res = await axios.post("/api/auth/login", user);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <label>Email</label>
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <label>Password</label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
