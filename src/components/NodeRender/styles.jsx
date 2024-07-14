import styled from "styled-components";

export const NodeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  position: relative;
`;

export const Node = styled.div`
  position: relative;
  min-width: 10rem;
  height: 4rem;
  border: 5px solid var(--color-primary);
  background-color: #fff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: var(--color-butter);
`;
export const NodeLine = styled.span`
  position: absolute;
  display: block;
  right: ${(props) => props.$right}px;
  width: ${(props) => props.$width}px;
  transform: rotate(${(props) => props.$angle}deg);
  transform-origin: 100% 0;
  background-color: black;
  height: 0.2rem;
  z-index: -1;
`;

export const NodeText = styled.input`
  text-align: center;
  font-weight: 600;
  border: none;
`;

export const Button = styled.button`
  position: absolute;
  color: ${(props) => props.$color};
  width: ${(props) => props.$size}rem;
  height: ${(props) => props.$size}rem;
  border-radius: 50%;
  border: 2px solid ${(props) => props.$color};
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  > i {
    font-size: 1rem;
  }
`;
