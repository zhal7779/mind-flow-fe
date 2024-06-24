import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const NodeContent = styled.ul`
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Node = styled.li`
  position: relative;
  left: 150px;
  width: 10rem;
  height: 10rem;
  border: 5px solid var(--color-primary);
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 15rem;
  margin-bottom: 1rem;
  color: var(--color-butter);
  position: relative;
`;

export const NodeText = styled.span`
  position: absolute;
  font-weight: 600;
`;

export const Line = styled.div`
  position: absolute;
  background-color: #808080;
  width: 40px;
  height: 2px;
  top: 50%;
  right: -50px;
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
