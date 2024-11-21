import NoData from '../../components/etc/NoData';
import TagSideBar from '../../components/menu/TagSideBar';
import {
  Wrapper,
  MainTitle,
  TitlePadding,
  LoginButton,
  CenterWrapper,
} from '../../styles/common';
import { SideContainer, Container } from './styles';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/atoms/auth';
const Favorites = () => {
  const auth = useRecoilValue(authState);
  return (
    <Container>
      <SideContainer>
        <TagSideBar />
      </SideContainer>
      <Wrapper>
        <TitlePadding>
          <MainTitle>즐겨찾기</MainTitle>
        </TitlePadding>
        {!auth ? (
          <CenterWrapper>
            <NoData text={'로그인 후 이용해주세요'} />
            <LoginButton>로그인하러 가기</LoginButton>
          </CenterWrapper>
        ) : (
          <NoData text={'즐겨찾기 파일이 없습니다'} />
        )}
      </Wrapper>
    </Container>
  );
};

export default Favorites;
