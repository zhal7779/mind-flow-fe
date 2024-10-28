import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return <div onClick={() => navigate("/editor")}>파일</div>;
};

export default Home;
