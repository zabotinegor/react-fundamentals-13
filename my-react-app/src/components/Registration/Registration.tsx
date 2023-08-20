import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { LOGIN } from "../../constants/Pages";

import "./Registration.css";

const Registration: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!name || !email || !password) {
      setErrors({ email: "Name, email and password are required" });
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      navigate(LOGIN, { replace: true });
    } catch (error) {
      console.error("Register error:", error);
      setErrors({ email: "Invalid email or password" });
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <Input type="text" placeholder="Name" value={name} onChange={setName} />
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={setEmail}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <Button text="Register" />
        <p>
          Already have an account? <Link to={LOGIN}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
