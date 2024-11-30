import { GlobalStyle } from './GlobalStyle';
import Editor from './pages/Editor';
import { useRecoilValue } from 'recoil';
import { isDarkModeState } from './recoil/atoms/isDarkModeState';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Trash from './pages/Trash';
import MainLayout from './layouts/MainLayout';
import AuthModal from './components/modal/AuthModal';
import MypageModal from './components/modal/MypageModal';
import { ThemeProvider } from 'styled-components';
import theme from './data/theme';
import Bookmark from './pages/Bookmark';

const App = () => {
  const isDarkMode = useRecoilValue(isDarkModeState);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home /> },
        {
          path: '/editor/:id',
          element: <Editor />,
        },
        {
          path: '/bookmark/:tag',
          element: <Bookmark />,
        },
        {
          path: '/trash',
          element: <Trash />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle isDarkMode={isDarkMode} />
      <RouterProvider router={router} />

      <AuthModal />
      <MypageModal />
    </ThemeProvider>
  );
};

export default App;
