import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: false,
});

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: null,
});

export const isOpenAuthModal = atom({
  key: 'isOpenAuthModal',
  default: true,
});

export const isOpenMypageModal = atom({
  key: 'isOpenMypageModal',
  default: false,
});
