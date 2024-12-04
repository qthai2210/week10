import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TodoPage from "../pages/TodoPage";
import { useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage";

const AppRoutes = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/todo"
        element={isLoggedIn ? <TodoPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AppRoutes;
