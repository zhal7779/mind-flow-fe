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
    overflow: hidden;
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

  input:focus,textarea:focus {outline:none;}

  ::-webkit-input-placeholder { 
      color: var(--color-text-06);
  }
  :-moz-placeholder { 
    color: var(--color-text-06);
  }
  ::-moz-placeholder { 
    color: var(--color-text-06);
  }
  :-ms-input-placeholder {
    color: var(--color-text-06);
  }


  textarea::-webkit-input-placeholder {
    color: var(--color-text-06);
  }

  textarea:-moz-placeholder {
      color: var(--color-text-06);
  }

  textarea::-moz-placeholder {
      color: var(--color-text-06);
  }

  textarea:-ms-input-placeholder {
      color: var(--color-text-06);
  }

  input[type=number]::-webkit-outer-spin-button,
  input[type=number]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }

  input[type=number] {
      -moz-appearance: textfield;
  }

  .prevent-drag {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }

  // 스크롤바 커스텀
  .y-scroll {
    overflow-y: auto;
    &::-webkit-scrollbar {
    width: 1.5rem;
    
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--color-point-gray-01);
      border-radius: 1.5rem;
      background-clip: padding-box;
      border: 0.5rem solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }

  /* sweetalert 설정 */
  div:where(.swal2-icon) {
    border: 0.25em solid rgba(0,0,0,0);

    &.swal2-question {
      border-color: #c9dae1;
      color: #87adbd;
    }
  }

`;
