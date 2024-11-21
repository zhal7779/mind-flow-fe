import {
  Wrapper,
  MainTitle,
  TitlePadding,
  LoginButton,
  CenterWrapper,
} from '../../styles/common';
import NoData from '../../components/NoData';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/atoms/auth';
const Trash = () => {
  const auth = useRecoilValue(authState);
  return (
    <Wrapper>
      <TitlePadding>
        <MainTitle>공간 휴지통</MainTitle>
      </TitlePadding>
      {!auth ? (
        <CenterWrapper>
          <NoData text={'로그인 후 이용해주세요'} />
          <LoginButton>로그인하러 가기</LoginButton>
        </CenterWrapper>
      ) : (
        <NoData text={'휴지통에 파일이 없습니다'} />
      )}
    </Wrapper>
  );
};

export default Trash;
