import { GlobalStyle } from "./GlobalStyle";
import Editor from "./pages/Editor";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkModeState } from "./recoil/atoms/isDarkModeState";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Trash from "./pages/Trash";
import MainLayout from "./layouts/MainLayout";
import AuthModal from "./components/modal/AuthModal";
import MypageModal from "./components/modal/MypageModal";
import { ThemeProvider } from "styled-components";
import theme from "./data/theme";
import Bookmark from "./pages/Bookmark";
import NotFoundPage from "./pages/NotFound";
import { useEffect } from "react";
import {
  fetchAccessToken,
  clearAccessToken,
  getAccessToken,
} from "./utils/auth";
import { authState } from "./recoil/atoms/auth";

const App = () => {
  const setAuth = useSetRecoilState(authState);
  const isDarkMode = useRecoilValue(isDarkModeState);
  const token = getAccessToken();

  useEffect(() => {
    const initializeAuth = async () => {
      const success = await fetchAccessToken();

      if (success) {
        setAuth(true);
      } else {
        clearAccessToken();
        setAuth(false);
      }
    };
    if (token) {
      initializeAuth();
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/editor/:id",
          element: <Editor />,
        },
        {
          path: "/bookmark/:tag",
          element: <Bookmark />,
        },
        {
          path: "/trash",
          element: <Trash />,
        },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle isDarkMode={isDarkMode} />
      <RouterProvider router={router} />
      {!token && <AuthModal />}

      <MypageModal />
    </ThemeProvider>
  );
};

export default App;
