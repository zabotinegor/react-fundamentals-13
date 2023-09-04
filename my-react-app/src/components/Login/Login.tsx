import "./Login.css";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { COURSES, REGISTRATION, TOKEN } from "../../constants/Pages";
import { actions } from "../../store/user/reducer";
import { LoginRequest } from "../../types/user";

const Login: React.FC = () => {
  const dispatch = useDispatch();
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

    const loginRequest: LoginRequest = {
      loginData: { email, password },
      handleSuccess: () => {
        navigate(COURSES, { replace: true });
      },
      handleAPIError: () => setErrors({ email: "Invalid email or password" }),
      handleError: () => setErrors({ email: "An error occurred" }),
    };

    dispatch(actions.loginUser(loginRequest));
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
