import { useRecoilState } from "recoil";
import { isDarkModeState } from "../../recoil/atoms/isDarkModeState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdSunny } from "react-icons/md";
import styled from "styled-components";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

const DarkModeButton: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeState);

  const handleChangeDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Button onClick={handleChangeDarkMode} $isDarkMode={isDarkMode}>
      {!isDarkMode ? (
        <FontAwesomeIcon icon={faMoon} />
      ) : (
        <MdSunny fontSize={"3rem"} />
      )}
    </Button>
  );
};

export default DarkModeButton;

interface ButtonProps {
  $isDarkMode: boolean;
}

const Button = styled.button<ButtonProps>`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  border-radius: 0.6rem;
  font-size: 2.6rem;
  background-color: transparent;
  color: ${({ $isDarkMode }) => (!$isDarkMode ? "#484848" : "#ffffff")};
`;
