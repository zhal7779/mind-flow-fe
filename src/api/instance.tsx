import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { isAxiosError, ResponseDataType } from '../types/axiosError';
import { alert } from '../utils/alert';
// import useAuthToken from '../hooks/useAuthToken';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '../recoil/atoms/auth';

// InternalAxiosRequestConfig 타입 확장
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const baseUrl = import.meta.env.VITE_API_URL;

// axios 인스턴스 생성 함수
const createAxiosInstance = (
  baseURL: string, // 도메인
  contentType: string = 'application/json;charset=UTF-8', // 컨텐츠 타입
  additionalConfig?: AxiosRequestConfig // 추가 설정
): AxiosInstance => {
  // 새로운 인스턴스 생성
  const instance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true, // 쿠키 포함
    ...additionalConfig,
  });

  // 요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      // 요청을 보내기 전에 작업 수행
      const accessToken = useRecoilValue(accessTokenState);
      if (accessToken !== null) {
        config.headers.Accept = 'application/json, text/plain, */*';
        config.headers.Authorization = `Bearer ${accessToken}`;
        config.headers['Content-Type'] = contentType;
      }
      console.log(config);
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response) => response, // 응답 데이터를 처리
    async (error) => {
      if (isAxiosError<ResponseDataType>(error)) {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        // Access Token 만료
        if (
          originalRequest &&
          error.response?.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true; // _retry 속성 설정

          try {
            // // 새 Access Token 재발급
            // const { fetchAccessToken } = useAuthToken();
            // await fetchAccessToken();

            // // 원래 요청 재시도
            // const { accessToken } = useAuthToken();
            // if (accessToken) {
            //   originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            // }

            return instance(originalRequest);
          } catch (tokenRefreshError) {
            const navigate = useNavigate();
            alert('다시 로그인해주세요.', 'error');
            navigate('/');
            return Promise.reject(tokenRefreshError);
          }
        }

        // 일반적인 에러 처리
        alert(`${error.response?.data.msg}`, 'error');
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// 기본 인스턴스
const instance = createAxiosInstance(baseUrl);

// 폼데이터 전송 인스턴스
const multiPartInstance = createAxiosInstance(baseUrl, 'multipart/form-data');

export { instance, multiPartInstance };
