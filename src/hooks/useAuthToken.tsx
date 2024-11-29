import { useState, useEffect } from 'react';
import { instance } from '../api/instance';

const useAuthToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // 서버에서 Access Token 재발급
  const fetchAccessToken = async () => {
    try {
      const response = await instance.get(`/api/auth/refresh`);
      setAccessToken(response.data);
    } catch (error) {
      console.error('액세스 토큰 발급 실패', error);
      setAccessToken(null);
    }
  };

  useEffect(() => {
    fetchAccessToken(); // 새로고침 시 호출
  }, []);

  const saveToken = (token: string) => setAccessToken(token);
  const clearToken = () => setAccessToken(null);

  return { accessToken, saveToken, clearToken, fetchAccessToken };
};

export default useAuthToken;
