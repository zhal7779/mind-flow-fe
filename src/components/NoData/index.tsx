import styled from 'styled-components';
import { CiFileOff } from 'react-icons/ci';
const NoData = () => {
  return (
    <NoDataContent>
      <CiFileOff />
      <span>생성된 파일이 없습니다</span>
    </NoDataContent>
  );
};

export default NoData;

const NoDataContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 10rem;
  color: var(--color-grey-02);
  > svg {
    font-size: 4rem;
  }

  > span {
    font-size: 1.3rem;
  }
`;
