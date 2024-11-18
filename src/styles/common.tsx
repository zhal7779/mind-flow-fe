import { styled } from "styled-components";

export const Wrapper = styled.main`
  padding: 6rem 4rem 0 6rem;
  width: 100%;
`;

export const MainTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
`;

export const TitlePadding = styled.div`
  padding-bottom: 5rem;
`;

export const SubTitle = styled.p`
  font-size: 1.4rem;
  color: #555557;

  line-height: 1.8rem;
  font-weight: 600;
`;

export const CheckBox = styled.span<{ $hover: boolean; $active: boolean }>`
  visibility: ${(props) =>
    props.$hover || props.$active ? "visible" : "hidden"};
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.$active ? "var( --color-purple)" : "var(--color-white)"};
  border: 1px solid var(--color-border);
  border-radius: 4px;
  z-index: 10;
  > svg {
    color: var(--color-white);
    font-size: 1.3rem;
  }
  &:hover {
    box-shadow: var(--shadow-primary);
  }
`;

export const DeleteButton = styled.button`
  padding: 0.5rem;
  background: transparent;
  border: 1px solid var(--color-danger);
  color: var(--color-danger);
  border-radius: 4px;
  display: flex;
  gap: 0.4rem;
  align-items: center;
  font-size: 1.2rem;
`;

export const BaseBox = styled.span`
  display: block;
  padding: 0.5rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-grey-02);
  font-size: 1.2rem;
`;
