import { instance } from '../api/instance';

// 액세스 토큰 관리용 변수
let accessToken: string | null = null;

// 액세스 토큰을 설정하는 함수
export const setAccessToken = (token: string) => {
  accessToken = token;
  localStorage.setItem('accessToken', token); // localStorage에 저장
};

// 액세스 토큰을 가져오는 함수
export const getAccessToken = () => {
  if (!accessToken) {
    accessToken = localStorage.getItem('accessToken'); // localStorage에서 가져오기
  }
  return accessToken;
};

// 액세스 토큰을 초기화하는 함수
export const clearAccessToken = () => {
  accessToken = null;
  localStorage.removeItem('accessToken'); // localStorage에서 제거
};

// 서버에서 Access Token 재발급
export const fetchAccessToken = async (): Promise<boolean> => {
  try {
    const { data } = await instance.get(`/api/auth/refresh`);
    const newToken = data.data;
    setAccessToken(newToken); // 토큰 설정
    return true; // 성공
  } catch (error) {
    console.error('액세스 토큰 발급 실패', error);
    clearAccessToken(); // 실패 시 토큰 초기화
    return false; // 실패
  }
};
