import { GlobalStyle } from "./GlobalStyle";
import Main from "./pages/Main";
import { useRecoilValue } from "recoil";
import { isDarkModeState } from "./recoil/atoms/isDarkModeState";
import DarkModeButton from "./components/DarkModeButton";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const isDarkMode = useRecoilValue(isDarkModeState);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
  ]);

  return (
    <>
      <GlobalStyle isDarkMode={isDarkMode} />
      <DarkModeButton />
      <RouterProvider router={router} />;
    </>
  );
};

export default App;
