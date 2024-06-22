import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="wrap">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
