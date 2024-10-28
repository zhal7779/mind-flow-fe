import { GlobalStyle } from "./GlobalStyle";
import Editor from "./pages/Editor";
import { useRecoilValue } from "recoil";
import { isDarkModeState } from "./recoil/atoms/isDarkModeState";
import DarkModeButton from "./components/DarkModeButton";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  const isDarkMode = useRecoilValue(isDarkModeState);

  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    {
      path: "/editor",
      element: <Editor />,
    },
  ]);

  return (
    <>
      <GlobalStyle isDarkMode={isDarkMode} />
      <DarkModeButton />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
