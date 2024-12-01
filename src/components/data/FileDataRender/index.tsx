import { useState } from 'react';
import * as S from './styles';
import { CheckBox, DeleteButton } from '../../../styles/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoGrid } from 'react-icons/io5';
import { faBars, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FaRegTrashCan } from 'react-icons/fa6';
import { IFile } from '../../../types/fileType';
import { alert, confirmAlert } from '../../../utils/alert';
import DataContainer from '../DataContainer';
import GridView from '../../etc/GridView';
import ListView from '../../etc/ListView';
type FileUpdateAndDeleteProps = {
  fileData: IFile[];
  isLoading: boolean;
  isError: boolean;
  deleteFile: (params: { file_list: string[] }) => void;
  noDataText: string;
};

const FileDataRender = ({
  fileData,
  isLoading,
  isError,
  deleteFile,
  noDataText,
}: FileUpdateAndDeleteProps) => {
  const [selectFiles, setSelectFiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState('grid');

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
      .filter((file) => !selectFiles.includes(file.file_id))
      .map((file) => file.file_id);

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
      deleteFile({ file_list: selectFiles })
    );
  };

  const handleChangeViewMode = (mode: string) => {
    setViewMode(mode);
    setSelectFiles([]);
  };
  return (
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
      <DataContainer
        data={fileData}
        isLoading={isLoading}
        isError={isError}
        noDataText={noDataText}
      >
        {viewMode === 'grid' ? (
          <GridView
            data={fileData}
            selectFiles={selectFiles}
            handleSelectFile={handleSelectFile}
          />
        ) : (
          <ListView
            data={fileData}
            selectFiles={selectFiles}
            handleSelectFile={handleSelectFile}
          />
        )}
      </DataContainer>
    </S.FileSection>
  );
};

export default FileDataRender;
