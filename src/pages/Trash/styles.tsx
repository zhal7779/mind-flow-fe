import styled from 'styled-components';

export const WarningText = styled.div`
  margin-top: 3rem;
  padding: 0.8rem 0.8rem;
  background: #ffe1e7;
  border: 1px solid var(--color-danger);
  color: var(--color-danger);
  border-radius: 4px;
  font-size: 1.3rem;

  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
`;

export const RestoreButton = styled.button`
  padding: 0.5rem;
  background: transparent;
  border: 1px solid #19dea6;
  color: #19dea6;
  background-color: #e0f4ef;
  font-weight: 600;
  border-radius: 4px;
  display: flex;
  gap: 0.4rem;
  align-items: center;
  font-size: 1.2rem;
`;
