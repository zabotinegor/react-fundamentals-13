import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { COURSES, REGISTRATION, TOKEN, USER_NAME } from "../../constants/Pages";

import "./Login.css";
import { loginUserAPI } from "../../helpers/requests";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (!email || !password) {
      setErrors({ email: "Email and password are required" });
      return;
    }

    loginUserAPI(
      email,
      password,
      (data) => {
        localStorage.setItem(TOKEN, data.result);
        localStorage.setItem(USER_NAME, data.user.name);
        navigate(COURSES, { replace: true });
      },
      (error) => {
        console.error("Login error:", error);
        setErrors({ email: "Invalid email or password" });
      }
    );
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
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
        <Button text="Login" />
      </form>
      <p>
        Don't have an account? <Link to={REGISTRATION}>Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
