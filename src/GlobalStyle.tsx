import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

interface GlobalStyleProps {
  isDarkMode: boolean;
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  ${reset}
// 공통 색상
    :root {
        //color
        --color-white: ${({ isDarkMode }) =>
          !isDarkMode ? '#ffffff' : '#9ca8b5'};
        --color-primary:${({ isDarkMode }) =>
          !isDarkMode ? '#fadf85' : '#3d4854'};
        --color-butter:${({ isDarkMode }) =>
          !isDarkMode ? '#FBD37C' : '#2F3740'};
        --color-main-bg: ${({ isDarkMode }) =>
          !isDarkMode ? '#FCFEE6' : '#222222'};
        --color-border :  ${({ isDarkMode }) =>
          !isDarkMode ? '#D4D5D7' : '#D4D5D7'};
        --color-grey-bg:   
        ${({ isDarkMode }) => (!isDarkMode ? '#fbfbfb' : '#222222')};
        --color-grey-active: rgba(18, 17, 42, .05);
        --color-red: #e26559;
        --color-blue: #2b7799;
        --color-green: #48767b;
        --color-purple: #6041da;
        --color-light-green: #84b9c0;
        --color-light-purple: #c5d7f2;
        --color-black-01:  #242424;
        --color-grey-01: #19191a;
        --color-grey-02: #8b8c8f;
        --color-grey-03: #f3f3f5;
        --color-grey-04: #555557;
        --color-danger: #f43529;
        
        --color-tag-red: #FF7487;
        --color-tag-orange: #FFB35A;
        --color-tag-green: #19DEA6;
        --color-tag-blue: #439eff;
        --color-tag-purple: #A07EFF;
        //box-shadow
        --shadow-primary:0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07); 
    --shadow-base: 0px 6px 20px rgba(25, 25, 26, .06), 0px 2px 12px rgba(25, 25, 26, .04);
  
    }




    /* 공통 스타일 */

    /*스크롤 커스텀 */
    /* 스크롤바의 폭 너비 */
    ::-webkit-scrollbar {
        width: 1.2rem;  
        height: 1.2rem;
    }

    ::-webkit-scrollbar-thumb {
        background: #A8A8A8; /* 스크롤바 색상 */
        border-radius: 10px; /* 스크롤바 둥근 테두리 */
    }
    ::-webkit-scrollbar-track {
        background:transparent  /*스크롤바 뒷 배경 색상*/
    }

    * {
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
        scroll-behavior: smooth;
      
    }

    body {
        font-family: 'AppleSDGothicNeo';
        font-size: 1.6rem;
        word-break: keep-all;
        color: var(--color-text-05);
        letter-spacing: -.05rem;
        overflow: auto;
    }

    a {
        text-decoration: none;
        white-space: nowrap;
        color: var(--color-text-01);
    }

    button {
        border: 0;
        outline: 0;
        cursor: pointer;
        font-family: inherit;
        letter-spacing: inherit;
        color: var(--color-text-01);
    }
    input ,textarea{
        border: none;
        resize: none;
        overflow: hidden;
    }
    input:focus, textarea:focus {
        outline: none;
    
    }

   h1, h2, h3, h4, h5, h6, p, span, li{
      color: var(--color-black-01);
    }


`;
