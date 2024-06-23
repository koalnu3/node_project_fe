import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import userStore from "../store/userStore";

const MainLayout = ({ children }) => {
  const { user, setUser } = userStore();

  return (
    <div className="wrap">
      <Header user={user} setUser={setUser} />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
