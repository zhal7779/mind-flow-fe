import styled from 'styled-components';

export const TagMenuWrapper = styled.aside`
  position: fixed;
  padding: 0 0.8rem;
  width: 100%;
  top: 0px;
  height: 100vh;
  width: 20rem;
  border-right: 1px solid var(--color-border);
`;

export const MenuTitleWrapper = styled.div`
  padding: 2.6rem 0.8rem 1.8rem 0.8rem;
`;

export const Tags = styled.ul`
  display: flex;
  gap: 0.4rem;
  flex-direction: column;
`;

export const Tag = styled.li<{ $active: boolean }>`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  width: 100%;
  font-size: 1.4rem;
  padding: 1rem;
  border-radius: 0.8rem;
  background-color: ${(props) =>
    props.$active ? 'var(--color-grey-03)' : 'transparent'};

  cursor: pointer;
  &:hover {
    background-color: var(--color-grey-03);
  }
`;
