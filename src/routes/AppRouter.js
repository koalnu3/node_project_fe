import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import AdminPage from "../page/AdminPage";
import ClassPage from "../page/ClassPage";
import ClassDetailPage from "../page/ClassDetailPage";
import HomePage from "../page/HomePage";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import StudentMyPage from "../page/StudentMyPage";
import TeacherMyPage from "../page/TeacherMyPage";
import PrivateRoute from "./PrivateRoute";
import Guide from "../Guide";
import MainLayout from "../Layout/MainLayout";
import AppLayout from "../Layout/AppLayout";
import userStore from "../store/userStore";
import { loginWithToken } from "../hooks/useUser";

const AppRouter = () => {
  const { user, setUser } = userStore();

  useEffect(() => {
    if (!user._id) {
      const checkAuth = async () => {
        try {
          const response = await loginWithToken();
          if (response.status !== 200) throw new Error(response.error);
          setUser(response.data.user);
        } catch (error) {
          console.log("error", error);
        }
      };
      checkAuth();
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      {!user._id && (
        <Route
          path="/login"
          element={
            <AppLayout>
              <LoginPage />
            </AppLayout>
          }
        />
      )}
      <Route
        path="/register"
        element={
          <AppLayout>
            <RegisterPage />
          </AppLayout>
        }
      />
      <Route path="class">
        <Route
          index
          element={
            <MainLayout>
              <ClassPage />
            </MainLayout>
          }
        />
        <Route
          path=":id"
          element={
            <MainLayout>
              <ClassDetailPage />
            </MainLayout>
          }
        />
      </Route>

      <Route element={<PrivateRoute permissionLevel="student" />}>
        <Route
          path="/studentMypage"
          element={
            <MainLayout>
              <StudentMyPage />
            </MainLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute permissionLevel="teacher" />}>
        <Route
          path="/teacherMypage"
          element={
            <MainLayout>
              <TeacherMyPage />
            </MainLayout>
          }
        />
      </Route>
      {/* <Route element={<PrivateRoute permissionLevel="admin" />}> */}
        <Route
          path="/admin"
          element={
            <MainLayout>
              <AdminPage />
            </MainLayout>
          }
        />
      {/* </Route> */}
      <Route
        path="/guide"
        element={
          <MainLayout>
            <Guide />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRouter;
