import React from 'react';
import LoadingSpinner from '../../etc/LoadingSpinner';
import NoData from '../../etc/NoData';
import { authState } from '../../../recoil/atoms/auth';
import { useRecoilValue } from 'recoil';
import LoginButton from '../../button/LoginButton';
import { CenterWrapper } from '../../../styles/common';
interface DataContainerProps<T> {
  isLoading: boolean;
  isError: boolean;
  data: T[];
  children: React.ReactNode;
  noDataText: string;
}

const DataContainer = <T,>({
  isLoading,
  isError,
  data,
  children,
  noDataText,
}: DataContainerProps<T>) => {
  const auth = useRecoilValue(authState);

  if (!auth)
    return (
      <CenterWrapper>
        <NoData text={'로그인 후 이용해주세요'} />
        <LoginButton />
      </CenterWrapper>
    );
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  if (data?.length === 0) return <NoData text={noDataText} />;
  return <>{children}</>;
};

export default DataContainer;
