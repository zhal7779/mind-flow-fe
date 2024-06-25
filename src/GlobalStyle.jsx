import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    //공통 색상
    :root{
      --color-primary: #fadf85;
      --color-butter: #FBD37C;
      --color-bg : #FCFEE6;
      --color-red: #e26559;
      --color-blue: #2b7799;
      --color-green: #48767b;
      --color-light-green: #84b9c0;
      --color-light-purple: #c5d7f2;
    

    }

    /* 공통 스타일  */
  * {
    box-sizing: border-box;
  }
  html{
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body{
    font-family: 'AppleSDGothicNeo';
    font-size: 1.6rem;
    word-break: keep-all;
    color: var(--color-text-05);
    letter-spacing: -.05rem;
  
  }

  a{
    text-decoration: none;
    white-space: nowrap;
    color: var(--color-text-01)
  }

  button{
    border: 0;
    outline: 0;
    cursor: pointer;
    font-family: inherit;
    letter-spacing: inherit;
    color: var(--color-text-01);
  }

  


`;
