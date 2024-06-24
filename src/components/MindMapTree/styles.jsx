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
  width: 5rem;
  height: 5rem;
  border: 5px solid #ffe697;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 15rem;
  margin-bottom: 1rem;
  color: #ffe697;
  position: relative;
`;

export const NodeText = styled.span`
  position: absolute;
  font-weight: 600;
`;

export const Line = styled.div`
  position: absolute;
  background-color: #808080;
  width: 55px;
  height: 2px;
  top: 50%;
  right: -55px;
`;

export const Button = styled.button`
  position: absolute;
  color: #2b7799;

  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 2px solid#2b7799;
  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;

  > i {
    font-size: 1rem;
  }
`;
