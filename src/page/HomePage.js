import React, { useEffect } from "react";
import userStore from "../store/userStore";
import Content from "../components/Content";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Content>
      <Link to="/guide">스타일 가이드보기</Link>
    </Content>
  );
};

export default HomePage;
