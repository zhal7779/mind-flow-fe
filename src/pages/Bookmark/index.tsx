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
import { useEffect, useState } from 'react';
import { IFile } from '../../types/fileType';
import LoadingSpinner from '../../components/etc/LoadingSpinner';
const Bookmark = () => {
  const { pathname } = useLocation();
  const tag = pathname.split('/')[2];

  const auth = useRecoilValue(authState);
  const { data, isLoading, isError, error } = useGetBookmarkFilesQuery(tag, {
    enabled: !!auth,
  });

  const [bookmarkData, setBookmarData] = useState<IFile | []>([]);

  useEffect(() => {
    if (auth && data !== undefined && !isLoading && !isError) {
      setBookmarData(data);
    }
  }, [data, isLoading, isError]);

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  // 에러 상태 처리
  if (isError) {
    console.error(error);
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

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
