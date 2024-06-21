import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppLayout = ({ children }) => {
  return (
    <div className="wrap">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default AppLayout;
