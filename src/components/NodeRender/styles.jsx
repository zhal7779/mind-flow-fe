import styled from "styled-components";

export const NodeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
  position: relative;
`;

export const Node = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const NodeLine = styled.span`
  position: absolute;
  display: block;
  right: ${(props) => props.$right / 10}rem;
  width: ${(props) => props.$width / 10}rem;
  transform: rotate(${(props) => props.$angle}deg);
  transform-origin: 100% 0;
  background-color: var(--color-green);
  height: 0.4rem;
  border-radius: 0.4rem;
`;

const commonInput = styled.textarea`
  text-align: center;
  padding: 2rem 1.6rem;
  background-color: #fff;
  border-radius: 3.6rem;
  box-sizing: content-box;
  height: auto;
  overflow: hidden;
`;

export const RootTopicInput = styled(commonInput)`
  font-size: 2rem;
  font-weight: 700;
  width: 100%;
  border: 5px solid var(--color-butter);
`;

export const MainTopicInput = styled(commonInput)`
  font-size: 1.6rem;
  font-weight: 600;
  width: 100%;
  border: 5px solid var(--color-primary);
`;

export const ContentInput = styled(commonInput)`
  font-size: 1.4rem;
  font-weight: 400;
  padding: 1.4rem 1.2rem;
`;

export const ButtonWrapper = styled.span`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  color: ${(props) => props.$color};
  width: ${(props) => props.$size}rem;
  height: ${(props) => props.$size}rem;
  border-radius: 50%;
  border: 2.5px solid ${(props) => props.$color};
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  > i {
    font-size: 1.2rem;
  }
  z-index: 1;
`;
