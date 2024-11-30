import { useLocation } from 'react-router-dom';
import NoData from '../../components/etc/NoData';
import TagSideBar from '../../components/menu/TagSideBar';
import {
  Wrapper,
  MainTitle,
  TitlePadding,
  CenterWrapper,
} from '../../styles/common';
import { SideContainer, Container } from './styles';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/atoms/auth';
import LoginButton from '../../components/button/LoginButton';
import { useGetBookmarkFilesQuery } from '../../hooks/usefileQuery';
const Bookmark = () => {
  const location = useLocation();
  console.log(location);
  const auth = useRecoilValue(authState);
  // const { data, isLoading, isError, error } = useGetBookmarkFilesQuery('', {
  //   enabled: !!auth,
  // });
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
            <LoginButton />
          </CenterWrapper>
        ) : (
          <NoData text={'즐겨찾기 파일이 없습니다'} />
        )}
      </Wrapper>
    </Container>
  );
};

export default Bookmark;
