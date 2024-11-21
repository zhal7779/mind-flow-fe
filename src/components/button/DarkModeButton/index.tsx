import { useRecoilState } from 'recoil';
import { isDarkModeState } from '../../../recoil/atoms/isDarkModeState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

const DarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeState);

  const handleChangeDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Button onClick={handleChangeDarkMode} $isDarkMode={isDarkMode}>
      <FontAwesomeIcon icon={faMoon} />
    </Button>
  );
};

export default DarkModeButton;

interface ButtonProps {
  $isDarkMode: boolean;
}

const Button = styled.button<ButtonProps>`
  z-index: 1000;
  border-radius: 50%;

  font-size: 2rem;
  background-color: transparent;
  color: #ffffff;
  background-color: ${(props) =>
    props.$isDarkMode
      ? 'var(--color-purple-dark)'
      : 'var(--color-grey-active)'};
  width: 3.2rem;
  height: 3.2rem;
`;
