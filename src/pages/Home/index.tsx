import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { fileDataState } from '../../recoil/atoms/fileDataState';
import { FileList } from '../../types/fileType';
import * as S from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaRegTrashCan } from 'react-icons/fa6';
import {
  faCheck,
  faFolderPlus,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import updateDate from '../../utils/updateDate';
import {
  Wrapper,
  MainTitle,
  CheckBox,
  DeleteButton,
  BaseBox,
  CenterWrapper,
} from '../../styles/common';
import NoData from '../../components/etc/NoData';
import { useState } from 'react';
import { alert, confirmAlert } from '../../utils/alert';
import { authState, isOpenAuthModal } from '../../recoil/atoms/auth';
import LoginButton from '../../components/button/LoginButton';
import { IoGrid } from 'react-icons/io5';
import GridView from '../../components/etc/GridView';
import ListView from '../../components/etc/ListView';

const Home = () => {
  const auth = useRecoilValue(authState);
  const setIsOpenModal = useSetRecoilState(isOpenAuthModal);
  const [fileData, setFileData] = useRecoilState(fileDataState);
  const [selectFiles, setSelectFiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState('grid');

  const navigate = useNavigate();

  const updatedDate = updateDate();

  const handleAddNewFile = () => {
    if (!auth) {
      return setIsOpenModal(true);
    }
    addNewFile();
    navigate(`/editor/${updatedDate}`);
  };

  const handleSelectFile = (id: string) => {
    setSelectFiles((prevFiles) => {
      if (!prevFiles.includes(id)) {
        return [...prevFiles, id];
      } else {
        return prevFiles.filter((item) => item !== id);
      }
    });
  };

  const handleToggleAllFile = () => {
    //파일이 전체 선택되어있을 경우 파일 전체 해제
    if (selectFiles.length === fileData.length && selectFiles.length) {
      return setSelectFiles([]);
    }

    const addFiles = fileData
      .filter((file) => !selectFiles.includes(file.id))
      .map((file) => file.id);

    if (addFiles.length === 0) {
      // 추가할 파일이 없을 경우 리턴
      return;
    }

    setSelectFiles((prevFiles) => [...prevFiles, ...addFiles]);
  };

  const handleDeleteFile = () => {
    if (!selectFiles.length) {
      return alert('선택한 파일이 없습니다', 'info');
    }

    confirmAlert('삭제하시겠습니까?', 'question', () =>
      alert('삭제되었습니다.', 'success')
    );
  };
  const selectTag = (index: number, tag: string) => {
    setFileData((prevFileData: FileList[]) => {
      const updatedFileData = [...prevFileData];
      updatedFileData[index] = {
        ...updatedFileData[index],
        tag,
      };

      return updatedFileData;
    });
  };

  const handleChangeViewMode = (mode: string) => {
    setViewMode(mode);
    setSelectFiles([]);
  };

  function addNewFile() {
    const newFileData = {
      id: updatedDate,
      fileName: '이름이 없는 파일',
      tag: null,
      updatedDate,
      tree: {
        value: '',
        node: 0,
        level: 0,
        position: { x: 0, y: 0, r: 0, t: 0 },
        parentNode: {
          node: -1,
          position: { x: 0, y: 0, r: 0, t: 0 },
        },
        leftChildNode: [],
        rightChildNode: [],
      },
    };

    setFileData((prevFileData: FileList[]) => [...prevFileData, newFileData]);
  }

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

      <S.FileSection>
        <S.TopWrapper>
          <S.DeleteContent>
            <CheckBox
              $hover={true}
              $active={
                fileData.length === selectFiles.length && selectFiles.length > 0
              }
              onClick={handleToggleAllFile}
            >
              <FontAwesomeIcon icon={faCheck} />
            </CheckBox>
            <DeleteButton onClick={handleDeleteFile}>
              <FaRegTrashCan />
              최근 열기에서 제거
            </DeleteButton>
          </S.DeleteContent>
          <S.ModeChangeContent>
            <S.ModeItem
              $view={viewMode === 'grid'}
              onClick={() => handleChangeViewMode('grid')}
            >
              <IoGrid />
            </S.ModeItem>
            <S.ModeItem
              $view={viewMode === 'list'}
              onClick={() => handleChangeViewMode('list')}
            >
              <FontAwesomeIcon icon={faBars} />
            </S.ModeItem>
          </S.ModeChangeContent>
        </S.TopWrapper>

        {!auth ? (
          <CenterWrapper>
            <NoData text={'로그인 후 이용해주세요'} />
            <LoginButton />
          </CenterWrapper>
        ) : fileData?.length === 0 ? (
          <NoData text={'최근 파일이 없습니다'} />
        ) : viewMode === 'grid' ? (
          <GridView
            data={fileData}
            selectFiles={selectFiles}
            handleSelectFile={handleSelectFile}
            selectTag={selectTag}
          />
        ) : (
          <ListView
            data={fileData}
            selectFiles={selectFiles}
            handleSelectFile={handleSelectFile}
            selectTag={selectTag}
          />
        )}
      </S.FileSection>
    </Wrapper>
  );
};

export default Home;
