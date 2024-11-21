import { GlobalStyle } from './GlobalStyle';
import Editor from './pages/Editor';
import { useRecoilValue } from 'recoil';
import { isDarkModeState } from './recoil/atoms/isDarkModeState';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Trash from './pages/Trash';
import MainLayout from './layouts/MainLayout';
import Modal from './components/Modal';

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
          path: '/favorites',
          element: <Favorites />,
        },
        {
          path: '/trash',
          element: <Trash />,
        },
      ],
    },
  ]);

  return (
    <>
      <GlobalStyle isDarkMode={isDarkMode} />
      <RouterProvider router={router} />
      <Modal isOpen={true} onClose={() => {}}>
        ddd
      </Modal>
    </>
  );
};

export default App;
