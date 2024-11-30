import React from 'react';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

interface LoadingSpinnerProps {
  size?: number; // 스피너 크기
  color?: string; // 스피너 색상
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 50,
  color = '#36d7b7',
}) => {
  return (
    <SpinnerWrapper>
      <ClipLoader size={size} color={color} />
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
