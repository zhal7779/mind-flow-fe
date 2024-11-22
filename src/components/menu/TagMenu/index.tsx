import Tags from '../../../data/tags';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
type TagMenuProps = {
  itemIndex: number;
  handleSelectTag: (itemIndex: number, tag: string) => void;
};

const TagMenu = ({ itemIndex, handleSelectTag }: TagMenuProps) => {
  return (
    <TagMenuContent>
      <ul>
        {Tags.map((tag, tagIndex) => (
          <li
            key={tagIndex}
            onClick={(e) => {
              e.stopPropagation();
              handleSelectTag(itemIndex, tag.tag);
            }}
          >
            <FontAwesomeIcon icon={faTag} style={{ color: tag.color }} />
            <span>{tag.name}</span>
          </li>
        ))}
      </ul>
    </TagMenuContent>
  );
};

export default TagMenu;

const TagMenuContent = styled.div`
  width: 10em;
  padding: 1.4rem 1rem;
  height: fit-content;
  border-radius: 0.8rem;
  background-color: var(--color-white);
  box-shadow: var(--shadow-primary);
  z-index: 1;

  > ul {
    display: flex;
    gap: 0.4rem;
    flex-direction: column;

    > li {
      display: flex;
      gap: 1rem;
      font-size: 1.4rem;
      padding: 0.5rem 0.8rem;
      border-radius: 0.4rem;
      cursor: pointer;
      &:hover {
        background-color: var(--color-grey-03);
      }
    }
  }
`;
