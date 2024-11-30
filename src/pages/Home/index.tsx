import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IFile } from '../../types/fileType';
import * as S from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { Wrapper, MainTitle, BaseBox } from '../../styles/common';
import { useState, useEffect } from 'react';
import { confirmAlert } from '../../utils/alert';
import { authState, isOpenAuthModal } from '../../recoil/atoms/auth';

import {
  useCreateFileQuery,
  useDeleteFileQuery,
  useReadFilesQuery,
} from '../../hooks/usefileQuery';

import FileDataRender from '../../components/data/FileDataRender';

const Home = () => {
  const auth = useRecoilValue(authState);
  const setIsOpenModal = useSetRecoilState(isOpenAuthModal);

  // `enabled`를 auth 상태로 설정
  const { data, isLoading, isError } = useReadFilesQuery({
    enabled: !!auth,
  });

  const [fileData, setFileData] = useState<IFile[] | []>([]);

  const { mutate: createFile } = useCreateFileQuery(['files']); //파일 생성
  const { mutate: deleteFile } = useDeleteFileQuery(['files']); //파일 삭제

  useEffect(() => {
    if (auth && data !== undefined && !isLoading && !isError) {
      setFileData(data);
    }
  }, [data, isLoading, isError]);

  const handleAddNewFile = () => {
    if (!auth) {
      return setIsOpenModal(true);
    }

    confirmAlert('새로운 파일을 생성하시겠습니까?', 'question', () =>
      createFile()
    );
  };

  return (
    <Wrapper>
      <S.TitleContent>
        <MainTitle>최근 열기</MainTitle>
        <BaseBox>파일 ({fileData.length})</BaseBox>
      </S.TitleContent>
      <S.NewFileFrame onClick={handleAddNewFile}>
        <FontAwesomeIcon icon={faFolderPlus} />
        <p>Create new file</p>
      </S.NewFileFrame>
      <FileDataRender
        fileData={fileData}
        isLoading={isLoading}
        isError={isError}
        deleteFile={deleteFile}
        noDataText="생성한 파일이 없습니다"
      />
    </Wrapper>
  );
};

export default Home;
