import { useLocation } from 'react-router-dom';
import TagSideBar from '../../components/menu/TagSideBar';
import { Wrapper, MainTitle, TitlePadding } from '../../styles/common';
import { SideContainer, Container } from './styles';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/atoms/auth';
import {
  useDeleteFileQuery,
  useReadBookmarkFilesQuery,
} from '../../hooks/usefileQuery';
import { useEffect, useState } from 'react';
import { IFile } from '../../types/fileType';
import FileDataRender from '../../components/data/FileDataRender';
const Bookmark = () => {
  const { pathname } = useLocation();
  const tag = pathname.split('/')[2];

  const auth = useRecoilValue(authState);

  const { data, isLoading, isError } = useReadBookmarkFilesQuery(tag, {
    enabled: !!auth,
  });

  const { mutate: deleteFile } = useDeleteFileQuery(['bookmarkfiles', tag]);

  const [bookmarkData, setBookmarData] = useState<IFile[] | []>([]);

  useEffect(() => {
    if (auth && data !== undefined && !isLoading && !isError) {
      setBookmarData(data);
    }
  }, [data, isLoading, isError]);

  return (
    <Container>
      <SideContainer>
        <TagSideBar />
      </SideContainer>
      <Wrapper>
        <TitlePadding>
          <MainTitle>즐겨찾기</MainTitle>
        </TitlePadding>
        <FileDataRender
          fileData={bookmarkData}
          isLoading={isLoading}
          isError={isError}
          deleteFile={deleteFile}
          noDataText="즐겨찾기 파일이 없습니다"
        />
      </Wrapper>
    </Container>
  );
};

export default Bookmark;
