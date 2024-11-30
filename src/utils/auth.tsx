import { instance } from '../api/instance';

// 액세스 토큰 관리용 변수
let accessToken: string | null = null;

// 액세스 토큰을 설정하는 함수
export const setAccessToken = (token: string) => {
  accessToken = token;
};

// 액세스 토큰을 가져오는 함수
export const getAccessToken = () => accessToken;

// 액세스 토큰을 초기화하는 함수
export const clearAccessToken = () => {
  accessToken = null;
};

// 서버에서 Access Token 재발급
export const fetchAccessToken = async (): Promise<void> => {
  try {
    const response = await instance.get(`/api/auth/refresh`);
    const newToken = response.data;
    setAccessToken(newToken); // 토큰 설정
  } catch (error) {
    console.error('액세스 토큰 발급 실패', error);
    clearAccessToken(); // 실패 시 토큰 초기화
  }
};
