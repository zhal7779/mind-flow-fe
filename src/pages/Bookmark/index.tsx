import { useLocation } from 'react-router-dom';
import TagSideBar from '../../components/menu/TagSideBar';
import { Wrapper, MainTitle, TitlePadding } from '../../styles/common';
import { SideContainer, Container } from './styles';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/atoms/auth';
import { useGetBookmarkFilesQuery } from '../../hooks/usefileQuery';
import { useEffect, useState } from 'react';
import { IFile } from '../../types/fileType';
import DataContainer from '../../components/data/DataContainer';
import GridView from '../../components/etc/GridView';
import ListView from '../../components/etc/ListView';
const Bookmark = () => {
  const { pathname } = useLocation();
  const tag = pathname.split('/')[2];

  const auth = useRecoilValue(authState);

  const [viewMode, setViewMode] = useState('grid');

  const { data, isLoading, isError } = useGetBookmarkFilesQuery(tag, {
    enabled: !!auth,
  });

  const [bookmarkData, setBookmarData] = useState<IFile[] | []>([]);

  useEffect(() => {
    if (auth && data !== undefined && !isLoading && !isError) {
      setBookmarData(data);
    }
  }, [data, isLoading, isError]);

  const handleChangeViewMode = (mode: string) => {
    setViewMode(mode);
    setSelectFiles([]);
  };

  return (
    <Container>
      <SideContainer>
        <TagSideBar />
      </SideContainer>
      <Wrapper>
        <TitlePadding>
          <MainTitle>즐겨찾기</MainTitle>
        </TitlePadding>
        <DataContainer
          data={bookmarkData}
          isLoading={isLoading}
          isError={isError}
          noDataText="즐겨찾기 파일이 없습니다"
        >
          <div>좀이따가</div>
          {/* {viewMode === 'grid' ? (
            <GridView
              data={bookmarkData}
              selectFiles={selectFiles}
              handleSelectFile={handleSelectFile}
              selectTag={selectTag}
            />
          ) : (
            <ListView
              data={bookmarkData}
              selectFiles={selectFiles}
              handleSelectFile={handleSelectFile}
              selectTag={selectTag}
            />
          )} */}
        </DataContainer>
      </Wrapper>
    </Container>
  );
};

export default Bookmark;
