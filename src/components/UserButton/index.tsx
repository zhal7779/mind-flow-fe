import {
  faArrowUpRightFromSquare,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const UserButton = () => {
  return (
    <Wrapper>
      <UserFrame>
        <UserIcon>
          <FontAwesomeIcon icon={faUser} />
        </UserIcon>
      </UserFrame>
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
    </Wrapper>
  );
};

export default UserButton;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  > svg {
    font-size: 1.5rem;
    color: var(--color-grey-05);
  }

  padding: 0.4rem;
  border-radius: 0.8rem;

  &:hover {
    background-color: var(--color-grey-06);
  }
`;

const UserFrame = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.8rem;
  background-color: var(--color-tag-purple);
  position: relative;
`;

const UserIcon = styled.span`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  font-size: 2.4rem;
  cursor: pointer;
  color: #ffff;
`;
