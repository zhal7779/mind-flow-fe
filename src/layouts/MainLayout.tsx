import { Outlet } from 'react-router-dom';
import SideBar from '../components/menu/SideBar';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isSideBarOnState } from '../recoil/atoms/isSideBarOnState';

const MainLayout = () => {
  const isSideBarOn = useRecoilValue(isSideBarOnState);
  return (
    <Wrapper>
      <SideBar />
      <Container $isSideBarOn={isSideBarOn}>
        <Outlet />
      </Container>
    </Wrapper>
  );
};

export default MainLayout;

const Wrapper = styled.div`
  display: flex;
`;
const Container = styled.main<{ $isSideBarOn: boolean }>`
  width: 100%;
  flex-grow: 1;
  margin-left: ${(props) => (props.$isSideBarOn ? '30rem' : '0')};
  transition: margin-left 0.35s ease-in-out;
`;
