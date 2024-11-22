import { FileList } from '../../../types/fileType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { CheckBox } from '../../../styles/common';
import * as S from './styles';
import { GoTag } from 'react-icons/go';
import { ActiveTag } from '../GridView/styles';
import { useState } from 'react';
import TagMenu from '../../menu/TagMenu';

type ListViewProps = {
  data: FileList[];
  selectFiles: string[];
  handleSelectFile: (id: string) => void;
  selectTag: (index: number, tag: string) => void;
};

const ListView = ({
  data,
  selectFiles,
  handleSelectFile,
  selectTag,
}: ListViewProps) => {
  const [activeTagMenu, setActiveTagMenu] = useState('');

  const navigate = useNavigate();

  const handleOpenFile = (id: string) => {
    navigate(`/editor/${id}`);
  };

  const handleActiveTagMenu = (id: string) => {
    setActiveTagMenu(id);
  };

  const handleSelectTag = (index: number, tag: string) => {
    setActiveTagMenu('');
    selectTag(index, tag);
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
            <tr key={index}>
              <td>
                <CheckBox
                  $active={selectFiles.includes(item.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectFile(item.id);
                  }}
                  style={{ visibility: 'visible' }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </CheckBox>
              </td>
              <td onClick={() => handleOpenFile(item.id)}>
                <div>
                  <S.FileImg>
                    <img src="/public/favicon.png" alt="favicon" />
                  </S.FileImg>
                  <p>{item.fileName}</p>
                </div>
              </td>
              <td>
                <span>{item.updatedDate}</span>
              </td>
              <td>
                <S.TagTd
                  onClick={(e) => {
                    e.stopPropagation();
                    handleActiveTagMenu(item.id);
                  }}
                >
                  {item.tag === null ? (
                    <GoTag style={{ color: 'var(--color-grey-02)' }} />
                  ) : (
                    <ActiveTag $tag={item.tag}>
                      <FontAwesomeIcon icon={faTag} />
                    </ActiveTag>
                  )}

                  {activeTagMenu === item.id && (
                    <S.TagMenuWrapper>
                      <TagMenu
                        itemIndex={index}
                        handleSelectTag={handleSelectTag}
                      />
                    </S.TagMenuWrapper>
                  )}
                </S.TagTd>
              </td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </div>
  );
};

export default ListView;
