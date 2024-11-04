import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import styled from "styled-components";
const MainLayout = () => {
  return (
    <Wrapper>
      <SideBar />
      <Outlet />
    </Wrapper>
  );
};

export default MainLayout;

const Wrapper = styled.div`
  display: flex;
`;
