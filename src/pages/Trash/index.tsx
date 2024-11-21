import {
  Wrapper,
  MainTitle,
  TitlePadding,
  CenterWrapper,
} from '../../styles/common';
import NoData from '../../components/etc/NoData';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/atoms/auth';
import LoginButton from '../../components/button/LoginButton';
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
          <LoginButton />
        </CenterWrapper>
      ) : (
        <NoData text={'휴지통에 파일이 없습니다'} />
      )}
    </Wrapper>
  );
};

export default Trash;
