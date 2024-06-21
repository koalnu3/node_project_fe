import React from "react";
import { Route, Routes } from "react-router";
import AdminPage from "../page/AdminPage";
import ClassDetailPage from "../page/ClassDetailPage";
import HomePage from "../page/HomePage";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import StudentMyPage from "../page/StudentMyPage";
import TeacherMyPage from "../page/TeacherMyPage";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/class/:id" element={<ClassDetailPage />} />

      <Route element={<PrivateRoute permissionLevel="student" />}>
        <Route path="/studentmypage" element={<StudentMyPage />} />
      </Route>
      <Route element={<PrivateRoute permissionLevel="teacher" />}>
        <Route path="/teachermypage" element={<TeacherMyPage />} />
      </Route>
      <Route element={<PrivateRoute permissionLevel="admin" />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
