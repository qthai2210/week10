import React, { useEffect } from "react";

import "../css/login/Login.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/todo"); // or whatever your protected route is
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="login-page">
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
