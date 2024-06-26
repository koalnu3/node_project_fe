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
import OrderPage from "../page/OrderPage";

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
  }, [user._id]);

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
      <Route
        path="/login"
        element={
          <AppLayout>
            <LoginPage />
          </AppLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AppLayout>
            <RegisterPage />
          </AppLayout>
        }
      />
      <Route
        path="/order"
        element={
          <MainLayout>
            <OrderPage />
          </MainLayout>
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

      {!!user._id && (
        <>
          <Route element={<PrivateRoute user={user} />}>
            <Route
              path="/studentMypage"
              element={
                <MainLayout>
                  <StudentMyPage user={user} setUser={setUser} />
                </MainLayout>
              }
            />
          </Route>
          <Route element={<PrivateRoute user={user} />}>
            <Route
              path="/teacherMypage"
              element={
                <MainLayout>
                  <TeacherMyPage />
                </MainLayout>
              }
            />
          </Route>
          <Route element={<PrivateRoute user={user} />}>
            <Route
              path="/admin"
              element={
                <MainLayout>
                  <AdminPage />
                </MainLayout>
              }
            />
          </Route>
        </>
      )}
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
