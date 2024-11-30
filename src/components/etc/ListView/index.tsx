import { IFile } from '../../../types/fileType';
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
  data: IFile[];
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
                  $active={selectFiles.includes(item.file_id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectFile(item.file_id);
                  }}
                  style={{ visibility: 'visible' }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </CheckBox>
              </td>
              <td onClick={() => handleOpenFile(item.file_id)}>
                <div>
                  <S.FileImg>
                    <img src="/public/favicon.png" alt="favicon" />
                  </S.FileImg>
                  <p>{item.file_name}</p>
                </div>
              </td>
              <td>
                <span>
                  {item.updated_at.split('T')[0]}{' '}
                  {item.updated_at.split('T')[1].slice(0, 8)}
                </span>
              </td>
              <td>
                <S.TagTd
                  onClick={(e) => {
                    e.stopPropagation();
                    handleActiveTagMenu(item.file_id);
                  }}
                >
                  {item.tag === null ? (
                    <GoTag style={{ color: 'var(--color-grey-02)' }} />
                  ) : (
                    <ActiveTag $tag={item.tag}>
                      <FontAwesomeIcon icon={faTag} />
                    </ActiveTag>
                  )}

                  {activeTagMenu === item.file_id && (
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
