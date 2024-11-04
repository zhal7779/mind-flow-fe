import * as S from "./styles";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faHouse,
  faTag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { isSideBarOnState } from "../../recoil/atoms/isSideBarOnState";
import { useNavigate } from "react-router-dom";

const MenuData = [
  { name: "홈페이지", icon: faHouse, color: "var(--color-red)", route: "/" },
  {
    name: "즐겨찾기",
    icon: faTag,
    color: "var(--color-green)",
    route: "favorites",
  },
  {
    name: "공간 휴지통",
    icon: faTrash,
    color: "var(--color-blue)",
    route: "trash",
  },
];

const SideBar = () => {
  const navigate = useNavigate();

  const [isSideBarOn, setIsSideBarOn] = useRecoilState(isSideBarOnState);
  const [showTag, setShowTag] = useState(false);
  const [activeItem, setActiveItem] = useState(MenuData[0].name);

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

  const onClickActive = (item: string, route: string) => {
    setActiveItem(item);
    navigate(route);
  };

  return (
    <>
      <S.SideMenuWrapper $isSideBarOn={isSideBarOn}>
        <S.Header>
          <S.Logo>MindFlow</S.Logo>
          <FontAwesomeIcon icon={faAnglesLeft} onClick={onClickToggle} />
        </S.Header>
        <S.Menu>
          {MenuData.map((menu, index) => (
            <S.MenuItem
              key={index}
              $isActive={activeItem === menu.name}
              $color={menu.color}
              onClick={() => onClickActive(menu.name, menu.route)}
            >
              <FontAwesomeIcon icon={menu.icon} />
              <span>{menu.name}</span>
            </S.MenuItem>
          ))}
        </S.Menu>
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
