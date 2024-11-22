import React from "react";
import { FileList } from "../../../types/fileType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { CheckBox } from "../../../styles/common";
import * as S from "./styles";

type ListViewProps = {
  data: FileList[];
};

const ListView = ({ data }: ListViewProps) => {
  const navigate = useNavigate();

  const handleOpenFile = (id: string) => {
    navigate(`/editor/${id}`);
  };
  return (
    <div>
      <S.Table>
        <thead>
          <tr>
            <th></th>
            <th>파일명</th>
            <th>최근 업데이트</th>
            <th>즐겨찾기</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={() => handleOpenFile(item.id)}>
              <td>
                <CheckBox $active={false} style={{ visibility: "visible" }}>
                  <FontAwesomeIcon icon={faCheck} />
                </CheckBox>
              </td>
              <td>{item.fileName}</td>
              <td>
                <span>{item.updatedDate}</span>
              </td>
              <td>
                <FontAwesomeIcon icon={faTag} />
              </td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </div>
  );
};

export default ListView;
