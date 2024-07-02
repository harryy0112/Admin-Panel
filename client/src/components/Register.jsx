import axios from "axios";
import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = { firstName, lastName, email, password };
    try {
      const res = await axios.post("/api/users/register", newUser);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={onChange}
          required
        />
        <label>First Name</label>
      </div>
      <div>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={onChange}
          required
        />
        <label>Last Name</label>
      </div>
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
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
