import * as S from './styles';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { isSideBarOnState } from '../../../recoil/atoms/isSideBarOnState';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi2';
import { BsTags } from 'react-icons/bs';
import { FaRegTrashCan } from 'react-icons/fa6';
import DarkModeButton from '../../button/DarkModeButton';
import UserButton from '../../button/UserButton';
const MenuData = [
  {
    name: '홈페이지',
    icon: <HiOutlineHome style={{ fontSize: '1.8rem' }} />,
    color: 'var(--color-grey-05)',
    route: '/',
  },
  {
    name: '즐겨찾기',
    icon: <BsTags style={{ fontSize: '1.6rem' }} />,
    color: 'var(--color-grey-05)',
    route: '/favorites',
  },
  {
    name: '공간 휴지통',
    icon: <FaRegTrashCan style={{ fontSize: '1.5rem' }} />,
    color: 'var(--color-grey-05)',
    route: '/trash',
  },
];

const SideBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isSideBarOn, setIsSideBarOn] = useRecoilState(isSideBarOnState);
  const [showTag, setShowTag] = useState(false);
  const [activeItem, setActiveItem] = useState(pathname);

  const onClickToggle = () => {
    if (isSideBarOn) {
      setTimeout(() => {
        setShowTag(true);
      }, 350);
    } else {
      setShowTag(false);
    }
    setIsSideBarOn(!isSideBarOn);
  };

  useEffect(() => {
    if (!isSideBarOn) {
      setShowTag(false);
    }
  }, [isSideBarOn]);

  const onClickActive = (route: string) => {
    setActiveItem(route);
    navigate(route);
  };

  return (
    <>
      <S.SideMenuWrapper $isSideBarOn={isSideBarOn}>
        <S.TopContent>
          <S.Header>
            <S.LogoImg src="/public/img/logo.png" alt="logo" />

            <FontAwesomeIcon icon={faAnglesLeft} onClick={onClickToggle} />
          </S.Header>
          <S.Menu>
            {MenuData.map((menu, index) => (
              <S.MenuItem
                key={index}
                $isActive={activeItem === menu.route}
                onClick={() => onClickActive(menu.route)}
              >
                {menu.icon}
                <span>{menu.name}</span>
              </S.MenuItem>
            ))}
          </S.Menu>
        </S.TopContent>
        <S.BottomContent>
          <UserButton />
          <DarkModeButton />
        </S.BottomContent>
      </S.SideMenuWrapper>
      {!isSideBarOn && showTag && (
        <S.Tag onClick={onClickToggle}>
          <FontAwesomeIcon icon={faAnglesRight} />
        </S.Tag>
      )}
    </>
  );
};

export default SideBar;
