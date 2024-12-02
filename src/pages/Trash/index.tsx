import {
  Wrapper,
  MainTitle,
  TitlePadding,
  CheckBox,
} from "../../styles/common";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/auth";
import {
  useReadStorageFilesQuery,
  useUpdateRestoreFileQuery,
} from "../../hooks/usefileQuery";
import { useEffect, useState } from "react";
import { IFile } from "../../types/fileType";
import DataContainer from "../../components/data/DataContainer";
import { WarningText, RestoreButton } from "./styles";
import { CgDanger } from "react-icons/cg";
import {
  FileSection,
  TopWrapper,
  DeleteContent,
} from "../../components/data/FileDataRender/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTag } from "@fortawesome/free-solid-svg-icons";
import {
  FileContent,
  FileFrame,
  FileImg,
  FileDes,
  TagContent,
  ActiveTag,
} from "../../components/etc/GridView/styles";
import { GoTag } from "react-icons/go";
import { LiaTrashRestoreAltSolid } from "react-icons/lia";
import { alert, confirmAlert } from "../../utils/alert";
const Trash = () => {
  const auth = useRecoilValue(authState);

  const [selectFiles, setSelectFiles] = useState<string[]>([]);
  const [hoverFile, setHoverFile] = useState("");

  // `enabled`를 auth 상태로 설정
  const { data, isLoading, isError } = useReadStorageFilesQuery({
    enabled: !!auth,
  });
  const [storageFileData, setStorageFileData] = useState<IFile[] | []>([]);

  const { mutate: restoreFile } = useUpdateRestoreFileQuery(["storagefiles"]); //파일 복구

  useEffect(() => {
    if (auth && data !== undefined && !isLoading && !isError) {
      setStorageFileData(data);
    }
  }, [data, isLoading, isError]);

  const handleMouseOver = (id: string) => {
    setHoverFile(id);
  };

  const handleMouseOut = () => {
    setHoverFile("");
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
    if (selectFiles.length === storageFileData.length && selectFiles.length) {
      return setSelectFiles([]);
    }

    const addFiles = storageFileData
      .filter((file) => !selectFiles.includes(file.file_id))
      .map((file) => file.file_id);

    if (addFiles.length === 0) {
      // 추가할 파일이 없을 경우 리턴
      return;
    }

    setSelectFiles((prevFiles) => [...prevFiles, ...addFiles]);
  };

  const handleRestoreFile = () => {
    if (!selectFiles.length) {
      return alert("선택한 파일이 없습니다", "info");
    }

    confirmAlert("복구하시겠습니까?", "question", () =>
      restoreFile({ file_list: selectFiles })
    );
  };
  return (
    <Wrapper>
      <TitlePadding>
        <MainTitle>공간 휴지통</MainTitle>
      </TitlePadding>
      <WarningText>
        <CgDanger />
        공간 휴지통에 있는 파일은 보관 날짜로 부터 30일 뒤 영구적으로
        삭제됩니다.
      </WarningText>
      <FileSection>
        <TopWrapper>
          <DeleteContent>
            <CheckBox
              $hover={true}
              $active={
                storageFileData.length === selectFiles.length &&
                selectFiles.length > 0
              }
              onClick={handleToggleAllFile}
            >
              <FontAwesomeIcon icon={faCheck} />
            </CheckBox>
            <RestoreButton onClick={handleRestoreFile}>
              <LiaTrashRestoreAltSolid fontSize={16} />
              파일 복구
            </RestoreButton>
          </DeleteContent>
        </TopWrapper>
      </FileSection>
      <DataContainer
        data={storageFileData}
        isLoading={isLoading}
        isError={isError}
        noDataText={"휴지통에 파일이 없습니다"}
      >
        <FileContent>
          {storageFileData.map((item, index) => (
            <FileFrame
              key={index}
              $active={selectFiles.includes(item.file_id)}
              onMouseOver={() => handleMouseOver(item.file_id)}
              onMouseOut={handleMouseOut}
            >
              <CheckBox
                $hover={hoverFile === item.file_id}
                $active={selectFiles.includes(item.file_id)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectFile(item.file_id);
                }}
              >
                <FontAwesomeIcon icon={faCheck} />
              </CheckBox>
              <FileImg>
                <img src="/favicon.png" alt="logo" />
              </FileImg>
              <FileDes>
                <p>{item.file_name}</p>
                <span>
                  {item.updated_at.split("T")[0]}{" "}
                  {item.updated_at.split("T")[1].slice(0, 8)} 마지막으로 수정
                </span>
                {item.scheduled_deletion_at !== null && (
                  <strong>
                    {item.scheduled_deletion_at.split("T")[0]}{" "}
                    {item.scheduled_deletion_at.split("T")[1].slice(0, 8)} 영구
                    삭제될 예정
                  </strong>
                )}
              </FileDes>
              <TagContent $hover={false}>
                {item.tag === null ? (
                  <GoTag style={{ color: "var(--color-grey-02)" }} />
                ) : (
                  <ActiveTag $tag={item.tag}>
                    <FontAwesomeIcon icon={faTag} />
                  </ActiveTag>
                )}
              </TagContent>
            </FileFrame>
          ))}
        </FileContent>
      </DataContainer>
    </Wrapper>
  );
};

export default Trash;
