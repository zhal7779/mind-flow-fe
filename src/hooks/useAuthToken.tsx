import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuthToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // 서버에서 Access Token 재발급
  const fetchAccessToken = async () => {
    try {
      const response = await axios.post(
        '/refresh',
        {},
        { withCredentials: true }
      );
      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error('Failed to refresh access token:', error);
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
