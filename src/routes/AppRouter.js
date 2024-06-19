import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "../page/HomePage";
import LoginPage from "../page/LoginPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRouter;
