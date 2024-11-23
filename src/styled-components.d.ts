import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      [key: string]: {
        mainNode: string;
        line: string;
        subNodeBorder: string;
        subNodeBg: string;
      };
    };
  }
}
