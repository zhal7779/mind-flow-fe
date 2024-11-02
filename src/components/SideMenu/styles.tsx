import styled from 'styled-components';

export const SideMenuWrapper = styled.div`
  padding: 0 1.2rem;
  min-width: 30rem;
  max-width: 81.3rem;
  top: 0px;
  height: 100vh;
  width: 30rem;
  border-right: 1px solid var(--color-border);
`;
export const Header = styled.header`
  padding: 2rem 1rem;
  display: flex;
  justify-content: space-between;

  svg {
    color: var(--color-grey-02);
    cursor: pointer;
    font-size: 1.8rem;
  }
`;

export const Logo = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;
