import styled from "styled-components";

export const Table = styled.table`
  width: 100%;

  thead {
    border-bottom: 1px solid var(--color-border);
    tr {
      th:nth-child(1) {
        width: 4%;
      }
      th:nth-child(2) {
        width: 55%;
      }
      th:nth-child(3) {
        width: 25%;
      }
    }
  }
  tbody {
    tr {
      td:nth-child(1),
      td:nth-child(3) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      td:nth-child(4) {
        text-align: center;
      }
    }
  }
  th,
  td {
    padding: 1rem;
  }
`;
