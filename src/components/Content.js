import React from "react";

const Content = ({ children, className }) => {
  return <div className={`content ${className}`}>{children}</div>;
};

export default Content;
